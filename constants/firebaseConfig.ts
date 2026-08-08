import { initializeApp } from "firebase/app";
import * as FirebaseAuth from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCf4xGvcpBewEZIQTJDPjDCjRU5_VOF-b8",
  authDomain: "base7pedreiras.firebaseapp.com",
  projectId: "base7pedreiras",
  storageBucket: "base7pedreiras.firebasestorage.app",
  messagingSenderId: "196296436080",
  appId: "1:196296436080:web:9f0fd3d9b599a7550307b5",
  measurementId: "G-B0X7P0CW5L",
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = FirebaseAuth as typeof FirebaseAuth & {
  getReactNativePersistence?: (storage: typeof AsyncStorage) => any;
};

export const auth = FirebaseAuth.initializeAuth(app, {
  persistence: firebaseAuth.getReactNativePersistence?.(AsyncStorage) as any,
});
export const db = getFirestore(app);

export default app;
