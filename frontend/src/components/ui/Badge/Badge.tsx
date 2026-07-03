import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Badge.module.css";

type BadgeVariant = "primary" | "success" | "warning" | "danger";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

function Badge({ children, variant = "primary", ...props }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`} {...props}>
      {children}
    </span>
  );
}

export default Badge;