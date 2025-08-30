import styled from "@emotion/styled";
import { useSheets } from "../../context/GoogleSheetContext";
import { t } from "../../translation/helper";
import Text from "../Text";
import { useLanguage } from "../../translation/LanguageContext";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem;
`;

const ListOfExperiences = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ExperienceItem = styled.div`
  display: flex;
  gap: 3rem;
`;

const ExperienceTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: justify;
  gap: 0.5rem;
  min-width: 10rem;
`;

const ExperienceDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListOfDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid ${({ theme }) => theme.textPrimary};
`;

const Experiences = () => {
  const { isLoading, experiences } = useSheets();
  const { language } = useLanguage();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Section>
      <Text as="h6">{t("experience", language)}</Text>
      <ListOfExperiences>
        {experiences.map((exp, index) => (
          <ExperienceItem key={index}>
            <ExperienceTitle>
              <Text as="h6">{exp.company}</Text>
              <Text as="span">
                {exp.startDate} - {exp.endDate ?? t("present", language)}
              </Text>
            </ExperienceTitle>
            <ExperienceDescription>
              <Text as="p">{exp.description}</Text>
              <ListOfDescription>
                {exp.listOfDescription.split("\\n")?.map((item, idx) => (
                  <Text as="p" key={idx}>
                    {item}
                  </Text>
                ))}
              </ListOfDescription>
            </ExperienceDescription>
          </ExperienceItem>
        ))}
      </ListOfExperiences>
    </Section>
  );
};

export default Experiences;
