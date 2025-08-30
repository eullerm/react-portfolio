export interface Theme {
  primary?: {
    color: string;
    colorHover: string;
    colorActive: string;
    colorFocus: string;
    colorText: string;
    colorTextHover: string;
  };
  secondary?: {
    color: string;
    colorHover: string;
    colorActive: string;
    colorFocus: string;
    colorText: string;
    colorTextHover: string;
  };

  textPrimary: string;
  textSecondary: string;
  textHelper: string;

  field: string;
  fieldHover: string;
  disabled: string;

  borderStrong: string;
  focus: string;

  supportError: string;
  supportWarning: string;

  background: string;
}

export const lightTheme: Theme = {
  primary: {
    color: "#4589FF",
    colorHover: "#0F62FE",
    colorActive: "#0F62FE",
    colorFocus: "#0F62FE",
    colorText: "#FFFFFF",
    colorTextHover: "#FFFFFF",
  },
  secondary: {
    color: "#1d3557",
    colorHover: "#16324a",
    colorActive: "#16324a",
    colorFocus: "#16324a",
    colorText: "#FFFFFF",
    colorTextHover: "#FFFFFF",
  },

  textPrimary: "#1d1d1d",
  textSecondary: "#525252",
  textHelper: "#6f6f6f",

  field: "#ffffff",
  fieldHover: "#f4f4f4",
  disabled: "#e0e0e0",

  borderStrong: "#8d8d8d",
  focus: "#0f62fe",

  supportError: "#da1e28",
  supportWarning: "#f1c21b",

  background: "#f5f5f5",
};

export const darkTheme: Theme = {
  primary: {
    color: "#4589FF",
    colorHover: "#0F62FE",
    colorActive: "#0F62FE",
    colorFocus: "#0F62FE",
    colorText: "#FFFFFF",
    colorTextHover: "#FFFFFF",
  },
  secondary: {
    color: "#1d3557",
    colorHover: "#16324a",
    colorActive: "#16324a",
    colorFocus: "#16324a",
    colorText: "#FFFFFF",
    colorTextHover: "#FFFFFF",
  },

  textPrimary: "#f4f4f4",
  textSecondary: "#c6c6c6",
  textHelper: "#a8a8a8",

  field: "#262626",
  fieldHover: "#393939",
  disabled: "#525252",

  borderStrong: "#6f6f6f",
  focus: "#4589ff",

  supportError: "#fa4d56",
  supportWarning: "#f1c21b",

  background: "#1f1f1f",
};
