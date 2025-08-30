import styled from "@emotion/styled";
import Text from "../Text";
import Contact from "../Contact";
import { Button, IconButton } from "../Button";
import Select from "../Select";
import { useSheets } from "../../context/GoogleSheetContext";
import { useTheme } from "../../theme";
import { t } from "../../translation/helper";
import { useLanguage } from "../../translation/LanguageContext";
import type { Language } from "../../translation/translations";
import { AnimatePresence, motion } from "framer-motion";
import Download from "../../assets/icons/download.svg?react";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const About = styled.div`
  display: flex;
  flex-direction: column;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  const { author, isLoading } = useSheets();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const languages: { value: Language; label: string }[] = [
    { value: "english", label: "English" },
    { value: "portuguese", label: "Português" },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Section>
      <Controls>
        <IconButton
          variant="secondary"
          appearance="text"
          onClick={toggleTheme}
          style={{ position: "relative", width: "3rem", height: "3rem" }}
        >
          <AnimatePresence mode="sync" initial={false}>
            {theme === "light" ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, x: -20, y: 20, rotate: -90 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                exit={{ opacity: 0, x: 20, y: 20, rotate: 90 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ position: "absolute" }}
              >
                ☀️
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, x: -20, y: 20, rotate: 90 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                exit={{ opacity: 0, x: 20, y: 20, rotate: -90 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ position: "absolute" }}
              >
                🌙
              </motion.span>
            )}
          </AnimatePresence>
        </IconButton>

        <Select
          value={language}
          onChange={(value) => setLanguage(value as Language)}
          placeHolder={t("select", language)}
          size="sm"
          options={languages}
          style={{ width: "10rem" }}
        />
      </Controls>
      <TopBar>
        <LeftInfo>
          <Text as="h6">{author?.name}</Text>
          <Text as="span">{author?.role}</Text>
          <Text as="span">{author?.address}</Text>
        </LeftInfo>

        <RightControls>
          <Button variant="primary" appearance="contained" icon={<Download />}>
            {t("resume", language)}
          </Button>
        </RightControls>
      </TopBar>

      <About>
        <Text as="h6">{t("about", language)}</Text>
        {author?.description.split("\\n").map((para: string, index: number) => (
          <Text as="p" key={index}>
            {para}
          </Text>
        ))}
      </About>

      <Contact />
    </Section>
  );
};

export default Header;
