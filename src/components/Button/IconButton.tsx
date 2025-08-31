import React from "react";
import styled from "@emotion/styled";

type ButtonVariant = "primary" | "secondary";
type ButtonAppearance = "contained" | "outlined" | "text";
const sizeMap = {
  xs: "1.5rem",
  sm: "2rem",
  md: "2.5rem",
  lg: "3rem",
  xl: "4rem",
  xxl: "5rem",
};

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  size?: keyof typeof sizeMap;
}

const colors = {
  primary: "rgb(69, 137, 255)",
  primaryHover: "rgb(15, 98, 254)",
  secondary: "#1D3557",
  secondaryHover: "#16324A",
  text: "#000",
};

const IconButton = styled.button<IconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 1.25rem;

  height: ${({ size = "md" }) => sizeMap[size]};

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

export default IconButton;
