import type { ReactNode } from "react";
import styles from "./MainContent.module.css";

type MainContentProps = {
  children: ReactNode;
};

function MainContent({ children }: MainContentProps) {
  return <main className={styles.mainContent}>{children}</main>;
}

export default MainContent;