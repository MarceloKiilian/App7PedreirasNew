// TypeScript fallback. Metro resolves firebaseConfig.web.ts or
// firebaseConfig.native.ts first according to the target platform.
export * from "./firebaseConfig.native";
export { default } from "./firebaseConfig.native";
