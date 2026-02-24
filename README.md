# Goal Fund

Goal-driven portfolio design platform for KR individual investors.

## Core Value

1. Goal amount and deadline based planning
2. Risk breakdown in one page
3. Monte Carlo success probability
4. Actionable rebalancing proposal
5. Coach-style insights

## Architecture Baseline

1. Modular Monolith + Hexagonal (`ADR-001`, Accepted)
2. Backend: Spring Boot
3. Frontend: Next.js
4. Database topology: tracked by `ADR-002`

## Governance Rules (Mandatory)

1. Every major technical decision must be documented as ADR.
2. No implementation before related ADR approval.
3. Each PR must reference linked ADR IDs.
4. `feat/*` and `fix/*` require TDD RED/GREEN evidence.
5. Push and PR actions require explicit user confirmation.

Key docs:

1. `AGENTS.md`
2. `docs/architecture/ADR-INDEX.md`
3. `docs/DECISION-PROTOCOL.md`
4. `docs/TASK.md`
5. `docs/ops/cloud-parallel-workflow.md`

## Branch Strategy

1. `develop` -> integration branch
2. `main` -> release branch
3. Feature/fix branches target `develop`
4. Release promotion follows `develop -> main`

## Verification

Preferred:

```powershell
scripts/self-verify.ps1
```

Task flow helpers:

```powershell
scripts/task-start.ps1 -TaskId T70 -Type feat -Topic e2e-perf-gate
scripts/task-report.ps1 -TaskId T70 -Type feat -RedCommand "..." -RedSummary "..." -GreenCommand "..." -GreenSummary "..."
scripts/task-pr.ps1 -TaskId T70 -Type feat
```

## Project Layout

```text
goal-fund/
  CHANGELOG.md
  backend/
  frontend/
  docs/
    PRD.md
    MVP.md
    TASK.md
    DECISION-PROTOCOL.md
    architecture/
    qa/
    ops/
    task-reports/
  scripts/
  .github/
```
