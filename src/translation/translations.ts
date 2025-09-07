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
    skills: "Habilidades",
    retry: "Tentar novamente",
    noAuth: "Sem autorização para acessar os dados.",
    notFound: "Dados não encontrados.",
    tooManyRequests:
      "Excesso de requests.\nAguarde um minuto e tente novamente.",
    unknown: "Ocorreu um erro inesperado.",
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
    skills: "Skills",
    retry: "Retry",
    noAuth: "Unauthorized access.",
    notFound: "Data not found.",
    tooManyRequests: "Too many requests.\nPlease wait a minute and try again.",
    unknown: "An unexpected error occurred.",
  },
};

export type Language = keyof typeof translations;

export type Translations = keyof ((typeof translations)["portuguese"] &
  (typeof translations)["english"]);
