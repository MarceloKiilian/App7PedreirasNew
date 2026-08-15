import type { Timestamp } from "firebase/firestore";

export type GiraStatus = "agendada" | "realizada" | "cancelada";

export interface Gira {
  id?: string;
  titulo: string;
  descricao: string;
  inicio: Timestamp;
  local: string;
  publicada: boolean;
  status: GiraStatus;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface GiraCreateInput {
  titulo: string;
  descricao: string;
  inicio: Date;
  local: string;
  publicada: boolean;
  status: GiraStatus;
  createdBy: string;
}

export interface GiraUpdateInput {
  titulo: string;
  descricao: string;
  inicio: Date;
  local: string;
  publicada: boolean;
}
