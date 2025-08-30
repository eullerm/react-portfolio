import React from "react";
import styled from "@emotion/styled";

type ButtonVariant = "primary" | "secondary";
type ButtonAppearance = "contained" | "outlined" | "text";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
}

const colors = {
  primary: "rgb(69, 137, 255)",
  primaryHover: "rgb(15, 98, 254)",
  secondary: "#1D3557",
  secondaryHover: "#16324A",
  text: "#000",
};

const StyledButton = styled.button<ButtonProps>`
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant = "primary", appearance = "contained" }) => {
    switch (appearance) {
      case "contained":
        return `
          background-color: ${colors[variant]};
          color: #fff;
          border: none;

          &:hover {
            background-color: ${variant === "primary" ? colors.primaryHover : colors.secondaryHover};
          }
        `;
      case "outlined":
        return `
          background-color: transparent;
          color: ${colors[variant]};
          border: 2px solid ${colors[variant]};

          &:hover {
            background-color: ${colors[variant]};
            color: #fff;
          }
        `;
      case "text":
        return `
          background-color: transparent;
          color: ${colors[variant]};
          border: none;

          &:hover {
            color: ${variant === "primary" ? colors.primaryHover : colors.secondaryHover};
          }
        `;
      default:
        return "";
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  appearance = "contained",
  children,
  ...props
}) => {
  return (
    <StyledButton variant={variant} appearance={appearance} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
