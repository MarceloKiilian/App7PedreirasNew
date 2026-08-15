import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";

import { db } from "../constants/firebaseConfig";
import type {
  Gira,
  GiraCreateInput,
  GiraStatus,
  GiraUpdateInput,
} from "../types/Gira";

const GIRA_COLLECTION = "giras";

const normalizeGiraStatus = (status: unknown): GiraStatus | null => {
  if (
    status === "agendada" ||
    status === "realizada" ||
    status === "cancelada"
  ) {
    return status;
  }

  return null;
};

const warnInvalidGiraDocument = (id: string, reason: string): void => {
  console.warn(
    `[girasService] Documento inválido ignorado: ${id}. Motivo: ${reason}`,
  );
};

const mapDocumentToGira = (
  snapshot: QueryDocumentSnapshot<DocumentData>,
): Gira | null => {
  const data = snapshot.data();

  const titulo = typeof data.titulo === "string" ? data.titulo.trim() : "";
  const descricao =
    typeof data.descricao === "string" ? data.descricao.trim() : "";
  const local = typeof data.local === "string" ? data.local.trim() : "";
  const createdBy = typeof data.createdBy === "string" ? data.createdBy : "";

  if (!titulo) {
    warnInvalidGiraDocument(snapshot.id, "titulo ausente ou vazio");
    return null;
  }

  if (!descricao) {
    warnInvalidGiraDocument(snapshot.id, "descricao ausente ou vazia");
    return null;
  }

  if (!(data.inicio instanceof Timestamp)) {
    warnInvalidGiraDocument(snapshot.id, "inicio inválido ou ausente");
    return null;
  }

  if (!local) {
    warnInvalidGiraDocument(snapshot.id, "local ausente ou vazio");
    return null;
  }

  const status = normalizeGiraStatus(data.status);
  if (!status) {
    warnInvalidGiraDocument(snapshot.id, "status inválido ou ausente");
    return null;
  }

  if (!createdBy) {
    warnInvalidGiraDocument(snapshot.id, "createdBy ausente ou vazio");
    return null;
  }

  if (!(data.createdAt instanceof Timestamp)) {
    warnInvalidGiraDocument(snapshot.id, "createdAt inválido ou ausente");
    return null;
  }

  if (!(data.updatedAt instanceof Timestamp)) {
    warnInvalidGiraDocument(snapshot.id, "updatedAt inválido ou ausente");
    return null;
  }

  return {
    id: snapshot.id,
    titulo,
    descricao,
    inicio: data.inicio,
    local,
    publicada: Boolean(data.publicada),
    status,
    createdBy,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

export const formatarData = (
  value: Timestamp | Date | null | undefined,
): string => {
  if (!value) {
    return "";
  }

  const date = value instanceof Date ? value : value.toDate();
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

export const formatarHorario = (
  value: Timestamp | Date | null | undefined,
): string => {
  if (!value) {
    return "";
  }

  const date = value instanceof Date ? value : value.toDate();
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

export const subscribeToNextPublishedGira = (
  onSuccess: (gira: Gira | null) => void,
  onError: (error: Error) => void,
): Unsubscribe => {
  const q = query(
    collection(db, GIRA_COLLECTION),
    where("publicada", "==", true),
    where("status", "==", "agendada"),
    where("inicio", ">=", Timestamp.now()),
    orderBy("inicio", "asc"),
    limit(1),
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const validGiras = snapshot.docs
        .map(mapDocumentToGira)
        .filter((gira): gira is Gira => gira !== null);

      if (validGiras.length === 0) {
        onSuccess(null);
        return;
      }

      onSuccess(validGiras[0]);
    },
    (error) => {
      onError(error);
    },
  );
};

export const subscribeToPublishedGiras = (
  onSuccess: (giras: Gira[]) => void,
  onError: (error: Error) => void,
): Unsubscribe => {
  const q = query(
    collection(db, GIRA_COLLECTION),
    where("publicada", "==", true),
    where("status", "==", "agendada"),
    where("inicio", ">=", Timestamp.now()),
    orderBy("inicio", "asc"),
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const validGiras = snapshot.docs
        .map(mapDocumentToGira)
        .filter((gira): gira is Gira => gira !== null);

      onSuccess(validGiras);
    },
    (error) => {
      onError(error);
    },
  );
};

export const subscribeToGirasForAdmin = (
  onSuccess: (giras: Gira[]) => void,
  onError: (error: Error) => void,
): Unsubscribe => {
  const q = query(collection(db, GIRA_COLLECTION), orderBy("inicio", "asc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const validGiras = snapshot.docs
        .map(mapDocumentToGira)
        .filter((gira): gira is Gira => gira !== null);

      onSuccess(validGiras);
    },
    (error) => {
      onError(error);
    },
  );
};

export const createGira = async (payload: GiraCreateInput): Promise<string> => {
  const docRef = await addDoc(collection(db, GIRA_COLLECTION), {
    titulo: payload.titulo.trim(),
    descricao: payload.descricao.trim(),
    inicio: Timestamp.fromDate(payload.inicio),
    local: payload.local.trim(),
    publicada: payload.publicada,
    status: payload.status,
    createdBy: payload.createdBy,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

export const updateGira = async (
  id: string,
  payload: GiraUpdateInput,
): Promise<void> => {
  await updateDoc(doc(db, GIRA_COLLECTION, id), {
    titulo: payload.titulo.trim(),
    descricao: payload.descricao.trim(),
    inicio: Timestamp.fromDate(payload.inicio),
    local: payload.local.trim(),
    publicada: payload.publicada,
    updatedAt: serverTimestamp(),
  });
};

export const updateGiraStatus = async (
  id: string,
  status: GiraStatus,
): Promise<void> => {
  await updateDoc(doc(db, GIRA_COLLECTION, id), {
    status,
    updatedAt: serverTimestamp(),
  });
};

export const toggleGiraPublicacao = async (
  id: string,
  publicada: boolean,
): Promise<void> => {
  await updateDoc(doc(db, GIRA_COLLECTION, id), {
    publicada,
    updatedAt: serverTimestamp(),
  });
};

export const getGiraStatusLabel = (status: GiraStatus): string => {
  switch (status) {
    case "realizada":
      return "Realizada";
    case "cancelada":
      return "Cancelada";
    default:
      return "Agendada";
  }
};
