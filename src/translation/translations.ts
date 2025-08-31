export const translations = {
  portuguese: {
    resume: "Currículo",
    submit: "Enviar",
    cancel: "Cancelar",
    language: "Idioma",
    select: "Selecione",
    about: "Sobre mim",
    projects: "Projetos",
    thanks: "Agradecimentos",
    contact: "Contato",
    experience: "Experiência",
    present: "Atualmente",
    seeMore: "Ver mais",
  },
  english: {
    resume: "Resume",
    submit: "Submit",
    cancel: "Cancel",
    language: "Language",
    select: "Select",
    about: "About me",
    projects: "Projects",
    thanks: "Thanks",
    contact: "Contact",
    experience: "Experience",
    present: "Present",
    seeMore: "See more",
  },
};

export type Language = keyof typeof translations;

export type Translations = keyof ((typeof translations)["portuguese"] &
  (typeof translations)["english"]);
