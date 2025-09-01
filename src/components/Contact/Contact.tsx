import styled from "@emotion/styled";
import Text from "../Text";
import { t } from "../../translation/helper";
import { useLanguage } from "../../translation/LanguageContext";
import Github from "../../assets/icons/github.svg?react";
import Linkedin from "../../assets/icons/linkedin.svg?react";

const contacts = [
  { label: "GitHub", url: "https://github.com/eullerm", icon: Github },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/euller-macena",
    icon: Linkedin,
  },
];

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;
`;

const Links = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Link = styled.a`
  text-decoration: none;
  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.textPrimary};
  }
`;

const Contact = () => {
  const { language } = useLanguage();

  return (
    <Section>
      <Text as="h6">{t("contact", language)}</Text>
      <Links>
        {contacts.map((c, i) => (
          <Link
            aria-label={c.label}
            key={i}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.icon ? <c.icon /> : <Text as="span">{c.label}</Text>}
          </Link>
        ))}
      </Links>
    </Section>
  );
};

export default Contact;
