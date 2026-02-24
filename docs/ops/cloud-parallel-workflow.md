# Cloud Parallel Workflow SOP

Version: v1.1  
Date: 2026-02-24

## 1. Purpose

This SOP defines the standard flow for parallel execution with isolated branches/worktrees.

1. What to read first
2. How to start and report a task
3. How to enforce TDD and verification gates
4. How to create and merge PRs safely

## 2. Mandatory Read Order (Before Any Work)

Every lane must read these files in order:

1. `docs/DECISION-PROTOCOL.md`
2. `docs/architecture/ADR-INDEX.md`
3. `docs/TASK.md`
4. `.github/PULL_REQUEST_TEMPLATE.md`
5. `AGENTS.md`
6. Only the minimum code paths for the assigned task

If read order is incomplete, execution must not start.

## 3. Task Start Rules

1. Start work only when task `Approval Status` is `Ready`.
2. Confirm all `Decision ADRs Required` are `Accepted`.
3. Copy task `Definition of Done` as the implementation target.
4. Restrict changes to paths listed under `Artifacts`.
5. Start the lane with:

```powershell
scripts/task-start.ps1 -TaskId <TaskID> -Type <feat|fix|chore|docs> -Topic <short-topic>
```

## 4. Branch and Parallel Rules

1. `1 Task = 1 Branch = 1 PR`
2. Branch format: `<type>/<TaskID>-<short-topic>`
3. Base branch for feature/fix work: `develop`
4. If two lanes modify the same file, run them sequentially.
5. Contract changes (API/DTO/schema) must have one owning lane.

## 5. TDD Gate (Mandatory for feat/fix)

1. `feat/*` and `fix/*` require Red -> Green -> Refactor evidence.
2. RED evidence: failing test command + expected failure reason.
3. GREEN evidence: passing test command + pass summary.
4. `fix/*` requires at least one regression test.
5. `chore/*` and `docs/*` are TDD-exempt unless behavior changes.

## 6. Lane Responsibilities

1. Backend lane (`feat/fix`)
   - Unit/integration RED -> GREEN required.
   - Bug fix must include regression test.
2. Frontend integration lane (`feat/fix`)
   - Component/integration test RED -> GREEN required.
3. Frontend design lane (`chore/docs`)
   - Design/document-only changes may skip TDD.
   - If runtime behavior changes, reclassify to `feat/*`.
4. QA/E2E lane
   - Reproduce failing scenario first, then prove green result.

## 7. Self Verify and Report

1. Run baseline verify script:

```powershell
scripts/self-verify.ps1
```

2. Record task evidence:

```powershell
scripts/task-report.ps1 -TaskId <TaskID> -Type <type> ...
```

3. Pre-PR gate check:

```powershell
scripts/task-pr.ps1 -TaskId <TaskID> -Type <type>
```

PR creation must stop when evidence is incomplete.

## 8. PR and Merge Rules

1. Push/PR/merge is blocked until user confirmation.
2. PR base branch: `develop` (except release promotion).
3. Release promotion branch: `develop -> main`.
4. All required checks must be green before merge.

## 9. Required Checks Baseline

1. `backend-test`
2. `backend-build`
3. `frontend-lint`
4. `frontend-build`
5. `frontend-e2e`
6. `perf-smoke`
7. `tdd-evidence-check` (PR metadata gate)

## 10. Manual Repository Settings

Configure branch/ruleset settings on GitHub:

1. Require PR review and up-to-date branches.
2. Set required checks listed above.
3. Disable direct pushes to protected branches.
4. Require conversation resolution before merge.

