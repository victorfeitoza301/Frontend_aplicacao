import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "danger" | "success";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

function Button({ children, variant = "primary", ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}

export default Button;