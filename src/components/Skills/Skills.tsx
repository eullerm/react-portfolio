import styled from "@emotion/styled";
import { t } from "../../translation/helper";
import { useLanguage } from "../../translation/LanguageContext";
import { useSheets } from "../../context/GoogleSheetContext";
import Text from "../Text";

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

const Badges = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Badge = styled.div<{ size: keyof typeof sizeCardMap }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  height: ${({ size }) => sizeCardMap[size]};
  padding: 0 0.75rem;
  border-radius: 9999px;
  border: 0.125rem solid ${({ theme }) => theme.textPrimary};
  color: ${({ theme }) => theme.textPrimary};

  font-weight: 500;
  line-height: 1;

  svg {
    width: 1rem;
    height: 1rem;
    fill: ${({ theme }) => theme.textPrimary};
  }
`;

const Skills = () => {
  const { language } = useLanguage();
  const { skills } = useSheets();

  return (
    <Section>
      <Text as="h6">{t("skills", language)}</Text>
      <Badges>
        {skills.map((skill) => (
          <Badge aria-label={skill} key={skill} size={"md"}>
            <Text as="span">{skill}</Text>
          </Badge>
        ))}
      </Badges>
    </Section>
  );
};

export default Skills;
