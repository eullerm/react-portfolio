import styled from "@emotion/styled";
import { type FallbackProps } from "react-error-boundary";
import Button from "../Button";
import Text from "../Text";
import { useLanguage } from "../../translation/LanguageContext";
import { t } from "../../translation/helper";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const Timer = styled.div`
  font-size: 1rem;
  color: #e63946;
`;

const GoogleSheetErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}: FallbackProps): React.ReactNode => {
  const { language } = useLanguage();
  const errorMessage = t(error.message, language);
  const [message, ...details] = errorMessage.split("\n");

  const [secondsLeft, setSecondsLeft] = React.useState(60);
  const isTooManyRequests = error.message === "tooManyRequests";

  React.useEffect(() => {
    if (!isTooManyRequests) return;

    setSecondsLeft(60);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTooManyRequests]);

  return (
    <Wrapper>
      <Text as="h4">{message}</Text>
      {details.map((detail: string, index: number) => (
        <Text as="div" key={index}>
          {detail}
        </Text>
      ))}
      {isTooManyRequests && <Timer>{secondsLeft}</Timer>}
      <Button style={{ minWidth: "8rem" }} onClick={resetErrorBoundary}>
        {t("retry", language)}
      </Button>
    </Wrapper>
  );
};

export default GoogleSheetErrorFallback;
