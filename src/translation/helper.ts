import { translations, type Language, type Translations } from "./translations";

export function t(
  key: Translations,
  lang: Language = "portuguese",
  params?: Record<string, string>
) {
  let text = translations[lang][key];
  if (params) {
    Object.keys(params).forEach((p) => {
      text = text.replace(`{${p}}`, params[p]);
    });
  }
  return text;
}
