import styled, { css } from "styled-components";

type Variant = "primary" | "secondary" | "danger";
type Size = "sm" | "md";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variants: Record<Variant, ReturnType<typeof css>> = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
  `,
};

const sizes: Record<Size, ReturnType<typeof css>> = {
  sm: css`
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.sm};
  `,
  md: css`
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSize.md};
  `,
};

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  ${({ variant = "primary" }) => variants[variant]}
  ${({ size = "md" }) => sizes[size]}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

export default Button;
