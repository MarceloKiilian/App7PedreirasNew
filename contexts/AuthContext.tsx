import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import type { Unsubscribe } from "firebase/firestore";

import { auth } from "../constants/firebaseConfig";
import {
  getAdministrador,
  subscribeToAdministrador,
} from "../services/administradoresService";
import type { Administrador } from "../types/Administrador";

interface AuthContextValue {
  user: User | null;
  administrador: Administrador | null;
  loading: boolean;
  isAdmin: boolean;
  canManageUsers: boolean;
  refreshAdministrador: () => Promise<Administrador | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [administrador, setAdministrador] =
    useState<Administrador | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAdministrador = async (
    currentUser: User | null,
  ): Promise<Administrador | null> => {
    if (!currentUser) {
      setAdministrador(null);
      return null;
    }

    try {
      const profile = await getAdministrador(currentUser.uid);
      setAdministrador(profile);
      return profile;
    } catch (error) {
      console.warn("NÃ£o foi possÃ­vel validar o perfil administrativo.", error);
      setAdministrador(null);
      return null;
    }
  };

  useEffect(() => {
    let unsubscribeProfile: Unsubscribe | undefined;
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      unsubscribeProfile?.();
      setLoading(true);
      setUser(currentUser);

      if (!currentUser) {
        setAdministrador(null);
        setLoading(false);
        return;
      }

      unsubscribeProfile = subscribeToAdministrador(
        currentUser.uid,
        (profile) => {
          setAdministrador(profile);
          setLoading(false);
        },
        (error) => {
          console.warn("NÃ£o foi possÃ­vel acompanhar o perfil administrativo.", error);
          setAdministrador(null);
          setLoading(false);
        },
      );
    });

    return () => {
      unsubscribeProfile?.();
      unsubscribeAuth();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const isAdmin = Boolean(user && administrador?.ativo);

    return {
      user,
      administrador,
      loading,
      isAdmin,
      canManageUsers:
        isAdmin && administrador?.perfil === "dirigente",
      refreshAdministrador: () => loadAdministrador(auth.currentUser),
    };
  }, [administrador, loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }
  return context;
};
