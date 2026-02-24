# AGENTS Operating Contract

Version: v1.0  
Date: 2026-02-24

## 1. Purpose

This file defines how each Codex terminal session must execute tasks in this repository.

## 2. Mandatory Read Order (Every New Terminal)

1. `docs/DECISION-PROTOCOL.md`
2. `docs/architecture/ADR-INDEX.md`
3. `docs/TASK.md`
4. `.github/PULL_REQUEST_TEMPLATE.md`
5. This file (`AGENTS.md`)

Work must not start before read order is completed.

## 3. Branch Naming and Ownership

1. Branch format: `<type>/<TaskID>-<short-topic>`
2. Allowed branch types:
   - `feat`: new behavior (TDD required)
   - `fix`: bug fix (TDD required)
   - `chore`: operational/config/document support (TDD optional)
   - `docs`: documentation-only work (TDD optional)
3. Recommended base branch: `develop`
4. Rule: `1 Task = 1 Branch = 1 PR`

## 4. TDD Rules

1. `feat/*` and `fix/*` branches must follow Red -> Green -> Refactor.
2. Completion report is invalid without RED/GREEN evidence for `feat/*` or `fix/*`.
3. Bug fixes on `fix/*` must add at least one regression test.
4. If code is written before a failing test, discard and restart from RED.

## 5. Task Execution Flow

1. Start task context:
   - `scripts/task-start.ps1 -TaskId <TaskID> -Type <feat|fix|chore|docs> -Topic <short-topic>`
2. Implement work in assigned scope.
3. Record evidence:
   - `scripts/task-report.ps1 -TaskId <TaskID> -Type <type> ...`
4. Create PR checklist preview:
   - `scripts/task-pr.ps1 -TaskId <TaskID> -Type <type>`
5. Ask for user confirmation before push and PR.

## 6. Push/PR Safety Rule

1. Do not push, create PR, or merge before explicit user confirmation.
2. Report local verification evidence first, then wait for approval.

