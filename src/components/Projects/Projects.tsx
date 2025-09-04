import styled from "@emotion/styled";
import { t } from "../../translation/helper";
import { useLanguage } from "../../translation/LanguageContext";
import { useSheets } from "../../context/GoogleSheetContext";
import Text from "../Text";
import ArrowUpRight from "../../assets/icons/arrowUpRight.svg?react";
import Skeleton from "../Skeleton";

const sizeCardMap = {
  sm: "2rem",
  md: "2.5rem",
  lg: "3rem",
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Links = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

const Card = styled.div<{ size: keyof typeof sizeCardMap }>`
  height: ${({ size }) => sizeCardMap[size]};
  border: 0.125rem solid ${({ theme }) => theme.textPrimary};
  padding: 0 1rem;
  border-radius: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  cursor: pointer;
  flex: 1 1 calc(33% - 1rem);
  min-width: fit-content;
  &:hover {
    background-color: ${({ theme }) => theme.primary?.color};
    color: ${({ theme }) => theme.primary?.colorText};
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
  svg {
    width: 1rem;
    height: 1rem;
    fill: ${({ theme }) => theme.textPrimary};
  }

  @media (min-width: 1024px) {
    max-width: 33%;
  }
`;

const Projects = () => {
  const { language } = useLanguage();
  const { projects, isLoading } = useSheets();

  return (
    <Section>
      <Text as="h6">{t("projects", language)}</Text>
      <Links>
        {isLoading
          ? [
              { name: "1", scheme: "", host: "", path: "" },
              { name: "2", scheme: "", host: "", path: "" },
              { name: "3", scheme: "", host: "", path: "" },
            ].map((project) => (
              <Skeleton
                key={project.name}
                style={{ flex: "1 1 calc(33% - 1rem)", height: sizeCardMap.md }}
              />
            ))
          : projects.map((project) => (
              <Card
                aria-label={project.name}
                key={project.name}
                size={"md"}
                onClick={() => {
                  if (isLoading) return;
                  window.open(
                    `${project.scheme}://${project.host}${project.path}`,
                    "noopener,noreferrer"
                  );
                }}
              >
                {project.name}
                <ArrowUpRight />
              </Card>
            ))}
      </Links>
    </Section>
  );
};

export default Projects;
