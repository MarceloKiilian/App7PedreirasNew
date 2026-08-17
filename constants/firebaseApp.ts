import { getApp, getApps, initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyCf4xGvcpBewEZIQTJDPjDCjRU5_VOF-b8",
  authDomain: "base7pedreiras.firebaseapp.com",
  projectId: "base7pedreiras",
  storageBucket: "base7pedreiras.firebasestorage.app",
  messagingSenderId: "196296436080",
  appId: "1:196296436080:web:9f0fd3d9b599a7550307b5",
  measurementId: "G-B0X7P0CW5L",
};

export const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();
