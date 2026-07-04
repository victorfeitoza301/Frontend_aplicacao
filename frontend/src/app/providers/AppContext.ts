import { createContext } from "react";

import type { Zerion } from "../../types/models";

export type AppContextValue = {
  zerion: Zerion | null;
  setZerion: (zerion: Zerion) => void;
};

export const AppContext = createContext<AppContextValue | null>(null);