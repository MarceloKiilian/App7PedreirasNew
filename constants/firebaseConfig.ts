import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configurações do Firebase fornecidas pelo usuário
const firebaseConfig = {
  apiKey: "AIzaSyCf4xGvcpBewEZIQTJDPjDCjRU5_VOF-b8",
  authDomain: "base7pedreiras.firebaseapp.com",
  projectId: "base7pedreiras",
  storageBucket: "base7pedreiras.firebasestorage.app",
  messagingSenderId: "196296436080",
  appId: "1:196296436080:web:9f0fd3d9b599a7550307b5",
  measurementId: "G-B0X7P0CW5L"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços com persistência para React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);

export default app;
