import styled from "@emotion/styled";
import { t } from "../../translation/helper";
import { useLanguage } from "../../translation/LanguageContext";
import { useSheets } from "../../context/GoogleSheetContext";
import Text from "../Text";
import ArrowUpRight from "../../assets/icons/arrowUpRight.svg?react";

const sizeCardMap = {
  sm: "2rem",
  md: "2.5rem",
  lg: "3rem",
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem;
`;

const Links = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
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
  max-width: 33%;
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
`;

const Projects = () => {
  const { language } = useLanguage();
  const { projects } = useSheets();

  return (
    <Section>
      <Text as="h6">{t("projects", language)}</Text>
      <Links>
        {projects.map((project) => (
          <Card
            aria-label={project.name}
            key={project.name}
            size={"md"}
            onClick={() =>
              window.open(
                `${project.schema}://${project.host}${project.path}`,
                "_blank",
                "noopener,noreferrer"
              )
            }
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
