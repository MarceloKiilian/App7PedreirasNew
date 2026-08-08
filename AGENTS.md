# App 7 Pedreiras — Agent Guidance

This project uses Expo SDK 54. Before writing framework-specific code, consult the exact versioned Expo documentation at https://docs.expo.dev/versions/v54.0.0/.

All agents must also read `.github/copilot-instructions.md`, `.github/BRANCHING.md`, and any matching `.github/instructions/*.instructions.md` files before making changes.

Core rules:
- Do not upgrade Expo, React Native, React, Firebase, or other major dependencies unless explicitly requested.
- Preserve the current UI unless the task requires visual changes.
- Keep changes focused and avoid unrelated refactors.
- Treat `app/admin/**` as security-sensitive.
- Never commit passwords, secrets, service-account files, private keys, or tokens.
- Never store plaintext passwords in Firestore.
- Never use Firebase Admin SDK inside the React Native client.
- Client-side route protection is not a substitute for Firestore Security Rules.
- Prefer explicit TypeScript domain types over `any`.
- Use Firestore timestamps consistently for chronological data and audit fields.
- Do not deploy Firebase rules, publish EAS builds, or make production releases unless explicitly asked.
- Before completing a coding task, run the relevant TypeScript/typecheck and report what was actually validated.

Git flow:
- normal feature/fix work starts from `develop`;
- feature/fix PRs target `develop`;
- tested work is promoted from `develop` to `release`;
- approved release candidates are promoted from `release` to `main`;
- production publication may happen only from `main`;
- do not bypass `develop` or `release` unless an emergency/hotfix flow is explicitly authorized.

When using GitHub Copilot in VS Code, prefer the reusable prompt files in `.github/prompts/` for the current project phases.
