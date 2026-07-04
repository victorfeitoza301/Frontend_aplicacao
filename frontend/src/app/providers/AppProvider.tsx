import { useState, type ReactNode } from "react";

import type { Zerion } from "../../types/models";
import { AppContext } from "./AppContext";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [zerion, setZerion] = useState<Zerion | null>(null);

  return (
    <AppContext.Provider value={{ zerion, setZerion }}>
      {children}
    </AppContext.Provider>
  );
}