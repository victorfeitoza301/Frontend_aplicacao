// Tipos que refletem exatamente o JSON retornado pelo backend Go.
// (ver internal/models/models.go no zerion-backend)

export type Zerion = {
  id: number;
  operatorId: number;
  name: string;
  class: string;
  level: number;
  status: string; // "ONLINE" | "OFFLINE"
  avatar: string;

  hp: number;
  hpMax: number;
  mp: number;
  mpMax: number;
  exp: number;
  expMax: number;
  sync: number;
  syncMax: number;

  lastAccess: string; // ISO date
  networkState: string;

  createdAt: string;
  updatedAt: string;
};

export type Operator = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

export type PanelSummary = {
  count: number;
  label: string;
  hint: string;
};

export type Dashboard = {
  welcome: {
    operatorName: string;
    message: string;
    lastAccess: string;
    networkState: string;
    missionsAvailable: number;
  };
  events: PanelSummary;
  achievements: PanelSummary;
  notices: PanelSummary;
  zerion: Zerion;
};

export type MissionStatus = "disponivel" | "em_andamento" | "concluida";

export type Mission = {
  id: number;
  zerionId: number;
  title: string;
  description: string;
  status: MissionStatus;
  rewardExp: number;
  createdAt: string;
  updatedAt: string;
};

export type ChatRole = "user" | "navi";

export type ChatMessage = {
  id: number;
  zerionId: number;
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type SendMessageResponse = {
  userMessage: ChatMessage;
  naviMessage: ChatMessage;
};

export type AuthResponse = {
  token: string;
  operator: Operator;
};
