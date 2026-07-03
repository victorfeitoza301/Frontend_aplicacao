import type { ReactNode } from "react";

import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import MainContent from "../../components/layout/MainContent";

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />

      <div style={{ display: "flex" }}>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </>
  );
}

export default MainLayout;