import { PublicInfo } from "@/src/model/info";

const firstName = "Antoine";
const lastName = "Brioy";
const jobTitle = "Tech Lead, Full-stack";

export const publicInfo: PublicInfo = {
  lang: "fr",
  anonymousName: "ABR",
  firstName,
  lastName,
  jobTitle,
  pageTitle: `${firstName} ${lastName} - ${jobTitle}`,
  pageDesc: `Page du CV de ${firstName} ${lastName}`,
  fullName: `${firstName} ${lastName}`,
  city: "Rennes",
  linkedIn: "linkedin.com/in/abrioy",
  github: "github.com/abrioy",
  cvPdfName: "CV_BRIOY_Antoine_Tech_Lead_dossier_de_compétences.pdf",
  resumePdfName: "CV_BRIOY_Antoine_Tech_Lead.pdf",

  cvDesc: "Dossier de compétence",
  cvHoverDownload: "Télécharger le dossier de compétence",
  cvHoverPrint: "Imprimer le dossier de compétence",
  resumeDesc: "CV",
  resumeHoverDownload: "Télécharger le CV",
  resumeHoverPrint: "Imprimer le CV",

  og: {
    lang: "fr_FR",
    title: `CV - ${jobTitle}`,
    siteName: `${firstName} ${lastName}`,
  },

  repoUrl: "https://github.com/abrioy/resume-nextjs-ssg",
};
