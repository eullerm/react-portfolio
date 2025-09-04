import styled from "@emotion/styled";
import { useSheets } from "../../context/GoogleSheetContext";
import { t } from "../../translation/helper";
import Text from "../Text";
import { useLanguage } from "../../translation/LanguageContext";
import Button from "../Button";
import Skeleton from "../Skeleton";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

  min-width: 5rem;
  @media (min-width: 1024px) {
    min-width: 10rem;
  }
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

  return (
    <Section>
      <Text as="h6">{t("experience", language)}</Text>
      <ListOfExperiences>
        {isLoading ? (
          <Skeleton style={{ width: "100%", height: "10rem" }} />
        ) : (
          experiences.map((exp, index) => (
            <ExperienceItem key={index}>
              <ExperienceTitle>
                <Text as="h6">{exp.company}</Text>
                <Text as="span">
                  {exp.startDate} - {exp.endDate ?? t("present", language)}
                </Text>
              </ExperienceTitle>
              <ExperienceDescription>
                <Text as="span">{exp.description}</Text>
                <ListOfDescription>
                  {exp.listOfDescription.split("\\n")?.map((item, idx) => (
                    <Text as="span" key={idx}>
                      {item}
                    </Text>
                  ))}
                </ListOfDescription>
                {exp.seeMore && (
                  <Button
                    size={"xs"}
                    appearance="text"
                    variant="primary"
                    onClick={() => console.log(exp.seeMore)}
                    rel="noopener noreferrer"
                  >
                    {t("seeMore", language)}
                  </Button>
                )}
              </ExperienceDescription>
            </ExperienceItem>
          ))
        )}
      </ListOfExperiences>
    </Section>
  );
};

export default Experiences;
