import styled from "@emotion/styled";
import Text from "../Text";
import { Button, IconButton } from "../Button";
import Select from "../Select";
import { useSheets } from "../../context/GoogleSheetContext";
import { useTheme } from "../../theme";
import { t } from "../../translation/helper";
import { useLanguage } from "../../translation/LanguageContext";
import type { Language } from "../../translation/translations";
import { AnimatePresence, motion } from "framer-motion";
import ArrowUpRight from "../../assets/icons/arrowUpRight.svg?react";
import Skeleton from "../Skeleton";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
`;

const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RightControls = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
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
  gap: 0.5rem;
`;

const Header = () => {
  const { author, isLoading } = useSheets();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const languages: { value: Language; label: string }[] = [
    { value: "english", label: "English" },
    { value: "portuguese", label: "Português" },
  ];

  return (
    <Section>
      <Controls>
        <IconButton
          variant="secondary"
          appearance="text"
          onClick={toggleTheme}
          style={{ position: "relative", width: "3rem", height: "3rem" }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {theme === "light" ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, x: -34, y: 34, rotate: -90 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                exit={{ opacity: 0, x: 34, y: 34, rotate: 90 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ position: "absolute" }}
              >
                ☀️
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, x: -34, y: 34, rotate: 90 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                exit={{ opacity: 0, x: 34, y: 34, rotate: -90 }}
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
          {isLoading ? (
            <>
              <Skeleton style={{ width: "100px", height: "1.25rem" }} />
              <Skeleton style={{ width: "160px", height: "1.25rem" }} />
              <Skeleton style={{ width: "234px", height: "1.25rem" }} />
            </>
          ) : (
            <>
              <Text as="h6">{author?.name}</Text>
              <Text as="span">{author?.role}</Text>
              <Text as="span">{author?.address}</Text>
            </>
          )}
        </LeftInfo>

        <RightControls>
          {isLoading ? (
            <Skeleton style={{ width: "7rem", height: "2rem" }} />
          ) : (
            author?.cvPath && (
              <Button
                variant="primary"
                appearance="contained"
                icon={<ArrowUpRight />}
                onClick={() =>
                  window.open(
                    `https://drive.google.com${author?.cvPath}` || "#",
                    "_blank"
                  )
                }
                rel="noopener noreferrer"
                size="sm"
              >
                {t("resume", language)}
              </Button>
            )
          )}
        </RightControls>
      </TopBar>

      <About>
        <Text as="h6">{t("about", language)}</Text>
        {isLoading ? (
          <Skeleton style={{ width: "28rem", height: "10rem" }} />
        ) : (
          author?.description
            .split("\\n")
            .map((para: string, index: number) => (
              <Text as="span" key={index}>
                {para}
              </Text>
            ))
        )}
      </About>
    </Section>
  );
};

export default Header;
