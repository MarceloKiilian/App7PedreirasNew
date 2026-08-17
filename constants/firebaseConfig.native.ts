import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, initializeAuth } from "firebase/auth";

// @ts-expect-error Firebase React Native export is not exposed by generic typings
import { getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { app, firebaseConfig } from "./firebaseApp";

const initializeNativeAuth = () => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
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

export const auth = initializeNativeAuth();
export const db = getFirestore(app);
export { firebaseConfig };
export default app;
