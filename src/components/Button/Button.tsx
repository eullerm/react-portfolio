import React from "react";
import styled from "@emotion/styled";

type ButtonVariant = "primary" | "secondary";
type ButtonAppearance = "contained" | "outlined" | "text";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.5s ease-in-out;

  svg {
    width: 1rem;
    height: 1rem;
    fill: ${({ theme, variant = "primary" }) => theme[variant]?.colorText};
  }
  &:hover {
    svg {
      fill: ${({ theme, variant = "primary" }) =>
        theme[variant]?.colorTextHover};
    }
  }

  ${({ variant = "primary", appearance = "contained", theme }) => {
    switch (appearance) {
      case "contained":
        return `
          background-color: ${theme[variant]?.color};
          color: #fff;
          border: none;

          &:hover {
            background-color: ${theme[variant]?.colorHover};
          }
        `;
      case "outlined":
        return `
          background-color: transparent;
          color: ${theme[variant]?.color};
          border: 2px solid ${theme[variant]?.color};

          &:hover {
            background-color: ${theme[variant]?.colorHover};
            color: #fff;
          }
        `;
      case "text":
        return `
          background-color: transparent;
          color: ${theme[variant]};
          border: none;

          &:hover {
            background-color: ${theme[variant]?.colorHover};
          }
        `;
      default:
        return "";
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  iconPosition = "right",
  ...props
}) => {
  return (
    <StyledButton {...props}>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </StyledButton>
  );
};

export default Button;
