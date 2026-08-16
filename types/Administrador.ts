import type { Timestamp } from "firebase/firestore";

export type PerfilAdministrador = "administrador" | "dirigente";

export interface Administrador {
  id: string;
  email: string;
  perfil: PerfilAdministrador;
  ativo: boolean;
  createdAt?: Timestamp;
  createdBy?: string;
  updatedAt?: Timestamp;
  updatedBy?: string;
}
