import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

function Card({ children, ...props }: CardProps) {
  return (
    <div className={styles.card} {...props}>
      {children}
    </div>
  );
}

export default Card;