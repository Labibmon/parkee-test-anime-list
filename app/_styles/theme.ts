export const theme = {
  colors: {
    primary: "#4F46E5",
    primaryHover: "#4338CA",
    secondary: "#64748B",
    danger: "#DC2626",
    white: "#FFFFFF",
    text: "#111827",
    disabled: "#9CA3AF",
  },
  spacing: {
    sm: "8px",
    md: "12px",
    lg: "16px",
  },
  radius: {
    sm: "6px",
    md: "8px",
  },
  fontSize: {
    sm: "14px",
    md: "16px",
  },
} as const;

export type ThemeType = typeof theme;
