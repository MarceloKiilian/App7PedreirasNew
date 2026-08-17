import {
  browserLocalPersistence,
  getAuth,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { app, firebaseConfig } from "./firebaseApp";

const initializeWebAuth = () => {
  try {
    return initializeAuth(app, {
      persistence: browserLocalPersistence,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "auth/already-initialized"
    ) {
      return getAuth(app);
    }

    throw error;
  }
};

export const auth = initializeWebAuth();
export const db = getFirestore(app);
export { firebaseConfig };
export default app;
