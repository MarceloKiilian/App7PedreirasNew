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

const normalizeGiraStatus = (status: unknown): GiraStatus => {
  if (status === "realizada" || status === "cancelada") {
    return status;
  }

  return "agendada";
};

const mapDocumentToGira = (
  snapshot: QueryDocumentSnapshot<DocumentData>,
): Gira => {
  const data = snapshot.data();

  return {
    id: snapshot.id,
    titulo: typeof data.titulo === "string" ? data.titulo : "",
    descricao: typeof data.descricao === "string" ? data.descricao : "",
    inicio: data.inicio instanceof Timestamp ? data.inicio : Timestamp.now(),
    local: typeof data.local === "string" ? data.local : "",
    publicada: Boolean(data.publicada),
    status: normalizeGiraStatus(data.status),
    createdBy: typeof data.createdBy === "string" ? data.createdBy : "",
    createdAt:
      data.createdAt instanceof Timestamp ? data.createdAt : Timestamp.now(),
    updatedAt:
      data.updatedAt instanceof Timestamp ? data.updatedAt : Timestamp.now(),
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
      if (snapshot.empty) {
        onSuccess(null);
        return;
      }

      onSuccess(mapDocumentToGira(snapshot.docs[0]));
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
      onSuccess(snapshot.docs.map(mapDocumentToGira));
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
      onSuccess(snapshot.docs.map(mapDocumentToGira));
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
