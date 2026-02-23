# Branch Strategy And Protection Playbook

Date: 2026-02-23
Repository: `notmybussiness/Goal-Fund`

## 1. Branch Model

1. `develop`: integration branch for ongoing development.
2. `main`: production release branch.
3. `feature/<task-or-topic>`: feature work branches from `develop`, merged back to `develop`.
4. `hotfix/<incident-or-topic>`: emergency fixes from `main`, merged to both `main` and `develop`.

## 2. PR Target Rules

1. Feature PR base branch: `develop`.
2. Production promotion PR: `develop -> main`.
3. Hotfix PR base branch: `main`, then back-merge to `develop`.
4. Direct push to `develop` and `main` is not allowed.

## 3. Required Status Checks

This repo publishes these checks from `.github/workflows/build.yml`:

1. `backend-test`
2. `backend-build`
3. `frontend-lint`
4. `frontend-build`

Set all four checks as required for protected branches.

## 4. Branch Protection Settings (What You Must Configure In GitHub)

Apply these settings to both `develop` and `main`.

### 4.1 Navigate

1. Open repository on GitHub.
2. Go to `Settings -> Branches`.
3. Create protection rule for `develop`.
4. Create protection rule for `main`.

### 4.2 Enable These Options

1. `Require a pull request before merging`
2. `Require approvals`: set at least `1` (recommend `2` for `main`)
3. `Require review from Code Owners`
4. `Dismiss stale pull request approvals when new commits are pushed`
5. `Require status checks to pass before merging`
6. Select required checks:
   - `backend-test`
   - `backend-build`
   - `frontend-lint`
   - `frontend-build`
7. `Require branches to be up to date before merging`
8. Disable force push
9. Disable branch deletion

### 4.3 Recommended Extra Hardening

1. Include administrators in restrictions (`Do not allow bypassing the above settings`).
2. Enable `Require conversation resolution before merging`.
3. Enable `Require signed commits` if your team already uses signing.

## 5. CODEOWNERS

The repository includes `.github/CODEOWNERS` with `@notmybussiness` as owner.

If your reviewer team is different, update it before enforcing `Require review from Code Owners`.

## 6. Day-To-Day Workflow

1. Update local `develop`

```bash
git checkout develop
git pull origin develop
```

2. Create feature branch

```bash
git checkout -b feature/<topic>
```

3. Push branch and open PR to `develop`

```bash
git push -u origin feature/<topic>
```

4. Merge to `develop` only after required checks pass and review is approved.
5. Release by opening PR from `develop` to `main`.
