import CV from "@/src/content/fr/cv/cv";
import { Configuration } from "@/src/model/configuration.model";
import FrenchResume from "@/src/content/fr/resume/resume";
import EnglishResume from "@/src/content/en/resume/resume";

export const configuration: Configuration = new Configuration({
  repoUrl: "https://github.com/abrioy/resume-nextjs-ssg",

  variants: [
    {
      locale: {
        label: "Français",
        url: "fr",
        navigatorLanguage: /fr/,
        htmlLang: "fr",
        openGraph: "fr_FR",
      },
      infos: {
        anonymousName: "ABR",
        firstName: "Antoine",
        lastName: "Brioy",
        jobTitle: "Tech Lead, Full-stack",
        pageTitle: (variant) =>
          `${variant.infos.firstName()} ${variant.infos.lastName()} - ${variant.infos.jobTitle()}`,
        pageDesc: (variant) =>
          `CV de ${variant.infos.firstName()} ${variant.infos.lastName()}`,
        fullName: (variant) =>
          `${variant.infos.firstName()} ${variant.infos.lastName()}`,
        location: "Rennes",
      },
      socials: {
        linkedIn: "linkedin.com/in/abrioy",
        github: "abrioy.github.io/resume",
      },
      documents: [
        {
          singlePage: true,
          headerTitle: "CV",
          pdfName: "CV_BRIOY_Antoine_Tech_Lead.pdf",
          hoverDownload: "Télécharger le CV",
          hoverPrint: "Imprimer le CV",
          component: FrenchResume,
        },
        {
          singlePage: false,
          headerTitle: "Dossier de compétence",
          pdfName: "CV_BRIOY_Antoine_Tech_Lead_dossier_de_compétences.pdf",
          hoverDownload: "Télécharger le dossier de compétence",
          hoverPrint: "Imprimer le dossier de compétence",
          component: CV,
        },
      ],
    },
    {
      locale: {
        label: "English",
        url: "en",
        navigatorLanguage: /en/,
        htmlLang: "en",
        openGraph: "en_US",
      },
      infos: {
        anonymousName: "ABR",
        firstName: "Antoine",
        lastName: "Brioy",
        jobTitle: "Tech Lead, Full-stack",
        pageTitle: (variant) =>
          `${variant.infos.firstName()} ${variant.infos.lastName()} - ${variant.infos.jobTitle()}`,
        pageDesc: (variant) =>
          `Resume of ${variant.infos.firstName()} ${variant.infos.lastName()}`,
        fullName: (variant) =>
          `${variant.infos.firstName()} ${variant.infos.lastName()}`,
        location: "Rennes",
      },
      socials: {
        linkedIn: "linkedin.com/in/abrioy",
        github: "abrioy.github.io/resume",
      },
      documents: [
        {
          singlePage: true,
          headerTitle: "CV",
          pdfName: "CV_BRIOY_Antoine_Tech_Lead.pdf",
          hoverDownload: "Download",
          hoverPrint: "Print",
          component: EnglishResume,
        },
      ],
    },
  ],
});
