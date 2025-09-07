import React, { createContext, useContext, useEffect, useState } from "react";
import { SheetsApi } from "../api/sheetsApi";
import { getAccessToken } from "../config/googleSheets";
import type { Author } from "../models/author";
import type { Experience } from "../models/experience";
import type { Project } from "../models/projects";
import type { Thanks } from "../models/thanks";
import { useLanguage } from "../translation/LanguageContext";
import { useErrorBoundary } from "react-error-boundary";

interface GoogleSheetContextType {
  author: Author | null;
  experiences: Experience[];
  skills: string[];
  projects: Project[];
  thanks: Thanks[];
  updatedAt: Date | null;
  isLoading: boolean;
}

const GoogleSheetContext = createContext<GoogleSheetContextType | undefined>(
  undefined
);

export const GoogleSheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [thanks, setThanks] = useState<Thanks[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await getAccessToken();

      try {
        const [author, experiences, skills, projects, thanks, updatedAt] =
          await Promise.all([
            SheetsApi.getAuthor(language),
            SheetsApi.getExperiences(language),
            SheetsApi.getSkills(),
            SheetsApi.getProjects(),
            SheetsApi.getThanks(language),
            SheetsApi.getUpdatedAt(),
          ]);
        setAuthor(author);
        setExperiences(experiences);
        setSkills(skills);
        setProjects(projects);
        setThanks(thanks);
        setUpdatedAt(updatedAt);
        setIsLoading(false);
      } catch (e) {
        showBoundary(e);
      }
    };
    loadData();
  }, [language]);

  return (
    <GoogleSheetContext.Provider
      value={{
        author,
        experiences,
        skills,
        projects,
        thanks,
        updatedAt,
        isLoading,
      }}
    >
      {children}
    </GoogleSheetContext.Provider>
  );
};

export const useSheets = () => {
  const context = useContext(GoogleSheetContext);
  if (!context) throw new Error("useSheets must be used within SheetsProvider");
  return context;
};
