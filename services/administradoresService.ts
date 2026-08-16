import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  type DocumentData,
  type DocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { deleteApp, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  inMemoryPersistence,
  initializeAuth,
  signOut,
} from "firebase/auth";

import { auth, db, firebaseConfig } from "../constants/firebaseConfig";
import type {
  Administrador,
  PerfilAdministrador,
} from "../types/Administrador";

const ADMIN_COLLECTION = "administradores";

const isPerfilAdministrador = (
  value: unknown,
): value is PerfilAdministrador =>
  value === "administrador" || value === "dirigente";

const mapAdministrador = (
  snapshot: DocumentSnapshot<DocumentData>,
): Administrador | null => {
  if (!snapshot.exists()) {
    return null;
  }
  const data = snapshot.data();

  if (
    typeof data.email !== "string" ||
    !isPerfilAdministrador(data.perfil) ||
    typeof data.ativo !== "boolean"
  ) {
    console.warn(
      `[administradoresService] Documento inv\u00e1lido ignorado: ${snapshot.id}`,
    );
    return null;
  }

  return {
    id: snapshot.id,
    email: data.email,
    perfil: data.perfil,
    ativo: data.ativo,
    createdAt: data.createdAt,
    createdBy: data.createdBy,
    updatedAt: data.updatedAt,
    updatedBy: data.updatedBy,
  };
};

export const getAdministrador = async (
  uid: string,
): Promise<Administrador | null> => {
  const snapshot = await getDoc(doc(db, ADMIN_COLLECTION, uid));
  if (!snapshot.exists()) {
    return null;
  }

  return mapAdministrador(snapshot);
};

export const subscribeToAdministradores = (
  onSuccess: (administradores: Administrador[]) => void,
  onError: (error: Error) => void,
): Unsubscribe => {
  const adminsQuery = query(
    collection(db, ADMIN_COLLECTION),
    orderBy("email", "asc"),
  );

  return onSnapshot(
    adminsQuery,
    (snapshot) => {
      onSuccess(
        snapshot.docs
          .map(mapAdministrador)
          .filter((admin): admin is Administrador => admin !== null),
      );
    },
    onError,
  );
};

export const subscribeToAdministrador = (
  uid: string,
  onSuccess: (administrador: Administrador | null) => void,
  onError: (error: Error) => void,
): Unsubscribe => onSnapshot(
  doc(db, ADMIN_COLLECTION, uid),
  (snapshot) => onSuccess(mapAdministrador(snapshot)),
  onError,
);

interface CreateAdminInput {
  email: string;
  password: string;
  perfil: PerfilAdministrador;
}

interface UpdateAdminInput {
  uid: string;
  perfil: PerfilAdministrador;
  ativo: boolean;
}

export const createAdministrador = async (
  input: CreateAdminInput,
): Promise<string> => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("auth/unauthenticated");
  }

  const secondaryApp = initializeApp(
    firebaseConfig,
    `admin-user-creation-${Date.now()}`,
  );
  const secondaryAuth = initializeAuth(secondaryApp, {
    persistence: inMemoryPersistence,
  });

  try {
    const credential = await createUserWithEmailAndPassword(
      secondaryAuth,
      input.email.trim().toLowerCase(),
      input.password,
    );

    try {
      await setDoc(doc(db, ADMIN_COLLECTION, credential.user.uid), {
        email: input.email.trim().toLowerCase(),
        perfil: input.perfil,
        ativo: true,
        createdAt: serverTimestamp(),
        createdBy: currentUser.uid,
        updatedAt: serverTimestamp(),
        updatedBy: currentUser.uid,
      });
    } catch (error) {
      await deleteUser(credential.user).catch(() => undefined);
      throw error;
    }

    return credential.user.uid;
  } finally {
    await signOut(secondaryAuth).catch(() => undefined);
    await deleteApp(secondaryApp);
  }
};

export const updateAdministrador = async (
  input: UpdateAdminInput,
): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("auth/unauthenticated");

  await updateDoc(doc(db, ADMIN_COLLECTION, input.uid), {
    perfil: input.perfil,
    ativo: input.ativo,
    updatedAt: serverTimestamp(),
    updatedBy: currentUser.uid,
  });
};

export const deleteAdministrador = async (uid: string): Promise<void> => {
  await deleteDoc(doc(db, ADMIN_COLLECTION, uid));
};
