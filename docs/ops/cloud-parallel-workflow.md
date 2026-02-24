# Cloud Parallel Workflow SOP

Version: v1.0
Date: 2026-02-23

## 1. Purpose

This document defines the standard operating flow for 목표한푼 cloud-parallel execution:

1. What to read first
2. How to set a task goal
3. How to self-verify before PR
4. How to create and merge PR safely

---

## 2. Mandatory Read Order (Before Any Work)

Every agent/squad must read these files in order:

1. `docs/DECISION-PROTOCOL.md`
2. `docs/architecture/ADR-INDEX.md`
3. `docs/TASK.md`
4. `.github/PULL_REQUEST_TEMPLATE.md`
5. Only the minimum code paths for the assigned task

If this read order is not completed, task execution must not start.

---

## 3. Goal Setting Rules

1. Start work only when task `Approval Status` is `Ready`.
2. Confirm all `Decision ADRs Required` are `Accepted`.
3. Copy task `Definition of Done` as the execution goal.
4. Deliver only in paths listed under `Artifacts`.
5. Out-of-scope requests must be split into a new task.

---

## 4. Parallel Execution Rules

1. `1 Task = 1 Branch = 1 PR`
2. Base branch for feature work: `develop`
3. If two tasks modify the same file, run them sequentially.
4. Contract changes (API/DTO/schema) must have one owning squad.
5. Other squads consume the contract; they do not redefine it.

---

## 5. Self Verify Standard (Required)

Run all checks before creating PR.

### 5.1 Gate Check

1. Confirm required ADRs are `Accepted`.
2. Confirm task status is `Ready`.

### 5.2 Build and Test Check

Preferred command from repository root:

```powershell
./scripts/self-verify.ps1
```

Manual fallback:

```powershell
cd backend
gradle test
# If gradle is not installed locally:
# docker run --rm -v "${PWD}:/workspace" -w /workspace gradle:8.10.2-jdk21 gradle test
cd ../frontend
npm ci
npm run lint
npm run build
```

If any command fails, PR must not be created.

### 5.3 API Behavior Check

1. Run integration tests, or
2. Execute minimum manual endpoint checks for changed APIs.

### 5.4 Evidence Recording

PR must include:

1. Commands executed
2. Result summary
3. Risk notes
4. Rollback notes

---

## 6. PR Flow

1. Sync local branch:

```bash
git checkout develop
git pull
```

2. Create feature branch:

```bash
git checkout -b feat/<TaskID>-<short-topic>
```

3. Commit and push:

```bash
git add .
git commit -m "feat: <summary>"
git push -u origin <branch>
```

4. Create PR:

- `base`: `develop`
- `head`: `feat/<TaskID>-<short-topic>`

5. Fill all required template fields:

- `Linked ADR IDs`
- `ADR status check: Accepted`
- `User approval date`
- `Options considered summary`
- `TASK item is Ready`
- Verification evidence

6. Merge rule:

- Merge into `develop` after review and required checks pass.

---

## 7. Branch Strategy (dev/prod)

1. `develop` = dev integration branch
2. `main` = production release branch
3. Feature branches always target `develop`
4. Production promotion is done by `develop -> main` release PR

---

## 8. CI Baseline

Current required checks:

1. `backend-test`
2. `backend-build`
3. `frontend-lint`
4. `frontend-build`

One-time repository settings (GitHub):

1. Protect `develop` branch.
2. Protect `main` branch.
3. Set all four checks above as required status checks.
4. Disable direct pushes to protected branches.
5. Require pull request approval and code owner review.

---

## 9. Current Approval Snapshot

Accepted in current baseline:

1. ADR-001
2. ADR-006
3. ADR-007
4. ADR-010
5. ADR-011
6. ADR-014
7. ADR-015
8. ADR-016

Still proposed:

1. ADR-002
2. ADR-003
3. ADR-004
4. ADR-005
5. ADR-008
6. ADR-009
7. ADR-012
8. ADR-013

Tasks requiring proposed ADRs remain blocked.

