# App 7 Pedreiras — GitHub Copilot Instructions

## Project context

This repository contains the mobile application for Tupã Óca do Caboclo 7 Pedreiras.

Current stack:
- React Native 0.81
- Expo SDK 54
- Expo Router 6
- React 19
- TypeScript with `strict: true`
- Firebase Authentication
- Cloud Firestore
- AsyncStorage for React Native authentication persistence
- EAS Build

Before changing framework-specific code, use documentation compatible with Expo SDK 54. Do not upgrade Expo, React Native, React, Firebase, or other major dependencies unless the task explicitly requires it.

## Working method

- Inspect the relevant existing files before editing them.
- Keep changes small, focused, and reversible.
- Do not refactor unrelated code while implementing a feature or fix.
- Preserve the current visual design unless the task explicitly requests UI changes.
- Preserve existing public app behavior unless the task explicitly requests a behavioral change.
- Prefer explicit types and domain interfaces over `any`.
- Do not disable TypeScript strict mode to make an error disappear.
- Reuse existing colors from `constants/Colors.ts`.
- Prefer extracting repeated Firebase/domain logic into `services/`, reusable state into `hooks/`, and domain models into `types/` as the project evolves.
- Do not introduce a new state-management library without an explicit architectural reason.

## Security rules

- Never commit passwords, private keys, service-account files, access tokens, refresh tokens, or other secrets.
- Never store passwords in Firestore.
- Never use Firebase Admin SDK inside the React Native client.
- Do not treat hidden screens or client-side navigation guards as database security.
- All administrative writes must also be protected by Firestore Security Rules.
- Administrative routes must require an authenticated user and, where applicable, an authorized administrative role.
- Do not log passwords, authentication tokens, or sensitive personal data.
- Firebase client configuration is not authorization; access control belongs in Authentication and Security Rules.
- Do not deploy Firestore rules, EAS builds, or production changes automatically unless explicitly requested.

## Authentication

- Firebase Authentication is the source of truth for authenticated sessions.
- Preserve React Native auth persistence through AsyncStorage.
- Do not automatically call `signOut` when opening the login screen.
- Logout actions must call Firebase `signOut(auth)` before redirecting.
- Protect the entire `/admin` area through centralized auth state instead of duplicating checks in each screen.
- Prefer an `AuthProvider`/`useAuth` pattern for shared authentication state.
- Handle Firebase auth initialization/loading state before redirecting.

## Firestore and domain data

- Prefer Firestore `Timestamp` values for dates that need chronological querying or sorting.
- Prefer `serverTimestamp()` for audit fields such as `createdAt` and `updatedAt`.
- Do not use `new Date().toISOString().split('T')[0]` as the source of truth for the user's local calendar date.
- Store dates in one canonical format and format them for display only at the UI boundary.
- Every realtime `onSnapshot` subscription must unsubscribe on cleanup and handle errors.
- UI states that depend on remote data should cover loading, success, empty, and error cases.
- When changing an existing Firestore model, account for compatibility with existing documents or clearly document the required migration.

## Administrative user management

- Creating a Firestore document in `administradores` does not create a Firebase Authentication user.
- Do not implement administrator creation in the mobile client using an approach that replaces the currently authenticated administrator session.
- For the MVP, prefer account creation through Firebase Console and store only authorization metadata in Firestore when needed.
- If in-app account administration is later required, design it around a trusted backend/Cloud Function using Firebase Admin SDK.

## Code quality

Before completing a code task:
1. Review the diff for accidental unrelated changes.
2. Run the available TypeScript/typecheck command. If one does not exist and adding it is in scope, add `typecheck` as `tsc --noEmit`.
3. Run relevant lint/tests when available.
4. Report files changed, validation performed, and any manual verification still required.

Do not claim that an app flow works unless it was either executed successfully or clearly identified as requiring manual validation in Expo/emulator/device.

## Git workflow

- Do not work directly on `master` for feature or fix work when a task branch is available.
- Use focused commits with descriptions of the actual change.
- Never commit generated directories such as `node_modules`, `.expo`, `dist`, `ios`, or `android` unless explicitly required.
- Never overwrite unrelated user changes.

## Current priorities

When no more specific task is supplied, prioritize work in this order:
1. Authentication and administrative route protection.
2. Firestore Security Rules and authorization.
3. Correct administrator-management behavior.
4. Date/time and Firestore model normalization for giras and obrigações.
5. Firestore error handling and resilient UI states.
6. Dynamic content migration where it provides operational value.
7. Linting, typecheck, tests, CI, Expo audio migration, and release preparation.
