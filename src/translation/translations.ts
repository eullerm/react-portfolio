export const translations = {
  portuguese: {
    resume: "Currículo",
    submit: "Enviar",
    cancel: "Cancelar",
    language: "Idioma",
    select: "Selecione",
    about: "Sobre mim",
  },
  english: {
    resume: "Resume",
    submit: "Submit",
    cancel: "Cancel",
    language: "Language",
    select: "Select",
    about: "About me",
  },
};

export type Language = keyof typeof translations;

export type Translations = keyof ((typeof translations)["portuguese"] &
  (typeof translations)["english"]);
