import React from "react";
import styled from "@emotion/styled";
import { HelperText } from "../HelperText";
import { Label } from "../Label";
import ChevronDown from "../../assets/icons/chevronDown.svg?react";
import Text from "../Text";

const sizeMap = {
  sm: "2rem",
  md: "2.5rem",
  lg: "3rem",
};

interface Option {
  value: string;
  label: string;
}

type OmitTypes = "size" | "error" | "warning" | "onChange";

interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, OmitTypes> {
  label?: string;
  helperText?: string;
  error?: boolean;
  warning?: boolean;
  size?: keyof typeof sizeMap;
  options: Option[];
  value?: string;
  placeHolder?: string;
  onChange?: (value: string) => void;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

const SelectWrapper = styled.div<{
  error?: boolean;
  warning?: boolean;
  size?: keyof typeof sizeMap;
}>`
  position: relative;
  display: inline-block;
  width: 100%;
  height: ${({ size }) => (size ? sizeMap[size] : sizeMap.md)};

  border: none;
  border-bottom: 0.0625rem solid
    ${({ error, warning, theme }) =>
      error
        ? theme.supportError
        : warning
          ? theme.supportWarning
          : theme.borderStrong};
  background: ${({ theme }) => theme.field};
  color: ${({ theme }) => theme.textPrimary};
  padding: 0 3rem 0 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.fieldHover};
  }

  &:focus {
    outline: none;
    border-bottom: 0.0625rem solid ${({ theme }) => theme.focus};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
    user-event: none;
  }

  border-radius: 0;
  cursor: pointer;
`;

const StyledSelect = styled.div<CustomSelectProps>`
  font-size: 1rem;
  background: transparent;
  box-sizing: border-box;
  border: none;
  width: 100%;
  height: 100%;
  align-content: center;
  color: ${({ theme }) => theme.textPrimary};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const Icon = styled(ChevronDown)`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 1rem;
  height: 1rem;
  fill: ${({ theme }) => theme.textPrimary};
`;

const Options = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.field};
  color: ${({ theme }) => theme.textPrimary};
  z-index: 1;
`;

const StyledOption = styled.div`
  padding: 0.5rem 0;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  &:hover {
    background: ${({ theme }) => theme.fieldHover};
  }
`;

interface CustomSelectProps {
  error?: boolean;
  warning?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  helperText,
  error,
  warning,
  size = "md",
  options,
  onChange,
  value,
  placeHolder,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <Container {...props}>
      {label && <Label>{label}</Label>}
      <SelectWrapper
        ref={ref}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <StyledSelect>
          <Text>
            {options.find((o) => o.value === value)?.label ?? placeHolder}
          </Text>
        </StyledSelect>
        <Icon />
      </SelectWrapper>
      {open && (
        <Options>
          {options.map((o) => (
            <StyledOption
              onClick={() => {
                setOpen(false);
                onChange && onChange(o.value);
              }}
              key={o.value}
            >
              <Text
                style={{
                  fontWeight: o.value === value ? "bold" : "normal",
                  paddingLeft: "1rem",
                }}
              >
                {o.label}
              </Text>
            </StyledOption>
          ))}
        </Options>
      )}
      {helperText && (
        <HelperText error={error} warning={warning}>
          {helperText}
        </HelperText>
      )}
    </Container>
  );
};

export default Select;
