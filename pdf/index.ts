#!/usr/bin/env ts-node

import puppeteer, { Browser } from "puppeteer";

import serveHandler from "serve-handler";
import * as http from "http";
import { mkdirSync, writeFileSync } from "fs";
import { Constant } from "@/src/model/constant.model";
import { copyFileSync, readdirSync } from "node:fs";

const basePath = process.argv[2] ? `/${process.argv[2]}` : "";

const BUILD_PATH = "./out";
const OUTPUT_PATH = `${BUILD_PATH}/assets`;
const PORT = 3001;
const APPLICATION_URL = `http://localhost:${PORT}${basePath}`;

function serveApplication() {
  const basePathRegex = new RegExp(`^/?${basePath}(/|$)`);
  const server = http.createServer((request, response) => {
    request.url = request.url?.replace(basePathRegex, "/");
    return serveHandler(request, response, {
      public: BUILD_PATH,
    });
  });

  server.listen(PORT, () => {
    console.log(`Running at ${APPLICATION_URL}`);
  });

  return server;
}

async function makePDF(browser: Browser, url: string, pdfPath: string) {
  console.log(`Creating pdf of url ${url}`);
  const page = await browser.newPage();
  await page.emulateMediaType("print");
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  await page.pdf({
    displayHeaderFooter: false,
    printBackground: true,
    format: "A4",
    preferCSSPageSize: true,
    path: pdfPath,
    omitBackground: false,
  });
  await page.close();
}

async function makePreview(
  browser: Browser,
  url: string,
  imagePath: string,
): Promise<{ fragment: string; pdfName: string }[]> {
  console.log(`Creating preview of url ${url}`);
  const page = await browser.newPage();

  const renderScale = 0.9;
  await page.setViewport({
    // Recommended Open Graph image size
    width: Constant.openGraphImageWidth * renderScale,
    height: Constant.openGraphImageHeight * renderScale,
    deviceScaleFactor: 1 / renderScale,
  });
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  await page.addStyleTag({
    content: `
      html {
        margin-top: 25px !important;
      }
    
      menu {
        display: none !important;
      }
    `,
  });

  const buffer = await page.screenshot({
    type: "png",
    encoding: "binary",
    captureBeyondViewport: true,
  });

  writeFileSync(imagePath, buffer, { encoding: "binary" });

  const documents = await page.$$eval("[data-pdf]", (documents) =>
    documents.map((element) => ({
      fragment: element.getAttribute("data-show-when") || "",
      pdfName: element.getAttribute("data-pdf") || "",
    })),
  );

  await page.close();

  return documents;
}

(async () => {
  const server = serveApplication();

  const browser = await puppeteer.launch({
    browser: "chrome",
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  });

  const locales = readdirSync(BUILD_PATH)
    .filter((file) => file.endsWith(".html"))
    .map((file) => file.replaceAll(/.html$/g, ""))
    .filter((file) => file !== "index" && file !== "404");

  let hasCopiedFirstPreview = false;
  for (const locale of locales) {
    mkdirSync(`${OUTPUT_PATH}/${locale}`, { recursive: true });

    const documents = await makePreview(
      browser,
      `${APPLICATION_URL}/${locale}`,
      `${OUTPUT_PATH}/${locale}/preview.png`,
    );

    if (!hasCopiedFirstPreview) {
      copyFileSync(
        `${OUTPUT_PATH}/${locale}/preview.png`,
        `${BUILD_PATH}/preview.png`,
      );
      hasCopiedFirstPreview = true;
    }

    for (const document of documents) {
      await makePDF(
        browser,
        `${APPLICATION_URL}/${locale}#${document.fragment}`,
        `${OUTPUT_PATH}/${locale}/${document.pdfName}`,
      );
    }
  }

  await browser.close();

  server.close();
})().catch((error) => {
  console.error(error);
});
