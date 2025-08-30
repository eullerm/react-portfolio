import styled from "@emotion/styled";

const HelperText = styled.span<{ error?: boolean; warning?: boolean }>`
  font-size: 12px;
  color: ${({ error, warning, theme }) =>
    error
      ? theme.supportError
      : warning
        ? theme.supportWarning
        : theme.textHelper};
`;

export default HelperText;
