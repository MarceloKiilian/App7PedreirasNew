---
applyTo: "app/admin/**/*.ts,app/admin/**/*.tsx,app/(tabs)/admin.tsx,constants/firebaseConfig.ts"
---

# Administrative area rules

- Treat every file under `app/admin` as security-sensitive.
- Authentication state must come from Firebase Authentication, not from route history or local booleans.
- Do not allow an unauthenticated user to remain on administrative screens after auth state resolves.
- Do not expose administrative functionality merely because a route can be navigated to directly.
- Logout must call Firebase `signOut(auth)`.
- Do not automatically sign users out when they visit the login screen.
- Authorization decisions must be enforceable by Firestore Security Rules as well as the UI.
- Do not store or process plaintext passwords in Firestore.
- Do not use Firebase Admin SDK in the React Native application.
- Changes to user-management flows must explain the distinction between Firebase Authentication users and Firestore authorization metadata.
- Any destructive action must keep an explicit user confirmation and surface failures to the user.
