import React from "react";
import { type Language } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = React.createContext<LanguageContextType>({
  language: "english",
  setLanguage: () => {},
});

const STORAGE_KEY = "language";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getInitialLanguage = (): Language => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as Language) ?? "english";
  };

  const [language, setLanguageState] =
    React.useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    localStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => React.useContext(LanguageContext);
