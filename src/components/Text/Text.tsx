/** @jsxImportSource @emotion/react **/
import React from "react";
import { css, useTheme } from "@emotion/react";
import type { Theme } from "@emotion/react";

const typographyMap = {
  code: {
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: "0.75rem",
    lineHeight: "1rem",
    letterSpacing: "0.32px",
    fontWeight: 400,
  },
  span: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    letterSpacing: "0.16px",
    fontWeight: 400,
  },
  p: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    letterSpacing: "0.16px",
    fontWeight: 400,
  },
  small: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: "0.75rem",
    lineHeight: "1rem",
    letterSpacing: "0.32px",
    fontWeight: 400,
  },
  label: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: "0.75rem",
    lineHeight: "1rem",
    letterSpacing: "0.32px",
    fontWeight: 400,
  },
  div: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: "1rem",
    lineHeight: "1.5rem",
    letterSpacing: "0.16px",
    fontWeight: 400,
  },
  h1: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: "3.375rem",
    lineHeight: "4rem",
    letterSpacing: "0px",
    fontWeight: 300,
  },
  h2: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: "2.625rem",
    lineHeight: "3.125rem",
    letterSpacing: "0px",
    fontWeight: 300,
  },
  h3: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: "2rem",
    lineHeight: "2.5rem",
    letterSpacing: "0px",
    fontWeight: 400,
  },
  h4: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: "1.75rem",
    lineHeight: "2.25rem",
    letterSpacing: "0px",
    fontWeight: 400,
  },
  h5: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    letterSpacing: "0px",
    fontWeight: 400,
  },
  h6: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontSize: "1rem",
    lineHeight: "1.5rem",
    letterSpacing: "0px",
    fontWeight: 600,
  },
};
type TypographyTag = keyof typeof typographyMap;
interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TypographyTag;
  color?: string;
}

const textStyle = (as: keyof typeof typographyMap, theme: Theme) => css`
  font-family: ${typographyMap[as].fontFamily};
  font-size: ${typographyMap[as].fontSize};
  line-height: ${typographyMap[as].lineHeight};
  letter-spacing: ${typographyMap[as].letterSpacing};
  font-weight: ${typographyMap[as].fontWeight};
  color: ${theme.textPrimary};
`;
const Text: React.FC<TextProps> = ({
  as = "span",
  color,
  children,
  ...props
}) => {
  const BaseComponent = as ?? "span";

  const theme = useTheme();

  return (
    <BaseComponent css={textStyle(as, theme)} {...props}>
      {children}
    </BaseComponent>
  );
};

export default Text;
