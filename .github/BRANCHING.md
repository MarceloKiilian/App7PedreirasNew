# Branching and Release Promotion — App 7 Pedreiras

## Objective

The repository uses three permanent branches so code moves through controlled environments before production:

`feature/*` / `fix/*` → `develop` → `release` → `main` → production

## Permanent branches

### `develop`
Integration and development testing branch.

Use it to:
- receive completed feature and fix pull requests;
- run the application locally/emulator and perform integration tests;
- validate changes together before creating a release candidate.

Normal work must not be committed directly to `develop`; use a task branch and a pull request.

### `release`
Release-candidate / homologation branch.

Use it to:
- receive only changes already tested in `develop`;
- execute final regression/homologation checks;
- prepare the exact version intended for production.

Changes should normally enter `release` only through a PR from `develop`.

### `main`
Production branch.

Use it to:
- represent exactly what is approved for production;
- trigger or authorize production publication;
- serve as the source for production tags/releases.

Changes should normally enter `main` only through a PR from `release`.

## Task branches

Create task branches from the latest `develop`:

- `feature/<short-description>` for new functionality;
- `fix/<short-description>` for normal bug fixes;
- `chore/<short-description>` for tooling/documentation/maintenance.

Example:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/admin-auth-guard
```

After development and local validation:

```bash
git add .
git commit -m "Protect admin routes with Firebase auth"
git push -u origin feature/admin-auth-guard
```

Open a Pull Request targeting `develop`.

## Promotion flow

### 1. Task branch → `develop`

Requirements before merge:
- implementation is complete for the agreed scope;
- typecheck/lint/tests available for the project pass;
- relevant functionality is manually tested in Expo/emulator/device;
- no secrets or unrelated changes are included;
- PR review is complete.

After merge, test the integrated state from `develop`.

### 2. `develop` → `release`

Create a promotion Pull Request only when the set of changes in `develop` is ready for homologation.

The PR should describe:
- features/fixes included;
- known limitations;
- manual regression scenarios;
- any Firebase/configuration/migration action required.

After merge, perform final homologation using the `release` branch.

### 3. `release` → `main`

Create this Pull Request only after homologation succeeds.

Before merge:
- confirm all release validation is complete;
- confirm database/rules/configuration changes are ready;
- confirm app version/build metadata when applicable;
- verify no extra development-only change entered `release`.

Merging to `main` means the code is approved for production.

## Production rule

Production deployment/publication must originate only from `main`.

Do not publish a production EAS build, Firebase production change, store release, or equivalent production artifact from `develop`, `release`, or a task branch.

## Hotfix flow

For an urgent production problem:

1. Create `hotfix/<description>` from the current `main`.
2. Implement and validate the smallest safe fix.
3. Open PR `hotfix/*` → `main`.
4. Publish from `main` after approval.
5. Propagate the same fix back into `release` and `develop` so the branches do not diverge.

Hotfix is the only expected exception to the normal `develop` → `release` → `main` promotion path.

## Recommended GitHub protections

Configure branch protection/rulesets for `develop`, `release`, and `main`:

- require pull requests before merging;
- block force pushes;
- block branch deletion;
- require status checks when CI is added;
- for `release` and `main`, require the branch to be up to date before merge;
- do not allow normal direct pushes to `main`.

If the repository is maintained by a single GitHub account, mandatory reviewer approval may be impractical because GitHub does not allow authors to approve their own PR. In that case, keep PRs mandatory and use checks/manual validation as the gate until another reviewer is available.

## Local branch synchronization

After a PR is merged into `develop`:

```bash
git checkout develop
git pull origin develop
```

Before starting another task:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<new-task>
```

Do not continue new feature development from an old task branch.
