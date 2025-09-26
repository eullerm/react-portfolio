import styled from "@emotion/styled";
import { type FallbackProps } from "react-error-boundary";
import Button from "../Button";
import Text from "../Text";
import { useLanguage } from "../../translation/LanguageContext";
import { t } from "../../translation/helper";
import React from "react";
import Timer3D from "../Timer3D";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const GoogleSheetErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const { language } = useLanguage();
  const errorMessage = t(error.message, language);
  const [message, ...details] = errorMessage.split("\n");

  const isTooManyRequests = error.message === "tooManyRequests";

  return (
    <Wrapper>
      <Text as="h4">{message}</Text>
      {details.map((detail, index) => (
        <Text as="div" key={index}>
          {detail}
        </Text>
      ))}

      {isTooManyRequests && <Timer3D seconds={60} />}

      <Button style={{ minWidth: "8rem" }} onClick={resetErrorBoundary}>
        {t("retry", language)}
      </Button>
    </Wrapper>
  );
};

export default GoogleSheetErrorFallback;
