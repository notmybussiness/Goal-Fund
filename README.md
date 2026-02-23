# 목표한푼

Goal-driven portfolio design platform for KR individual investors.

## Core Value

1. Goal amount + deadline based planning
2. Risk breakdown in one page
3. Monte Carlo success probability
4. Actionable rebalancing proposal
5. Coach-style insights

## Architecture Baseline

- Modular Monolith + Hexagonal (Accepted: ADR-001)
- Backend: Spring Boot
- Frontend: Next.js
- DB: PostgreSQL topology pending ADR-002

## ADR Governance (Mandatory)

1. Every technical decision must be documented as ADR.
2. No implementation before user approval of related ADR.
3. Each PR must reference linked ADR IDs.
4. Task can move to `Ready` only when required ADRs are `Accepted`.

Key docs:

- `docs/architecture/ADR-INDEX.md`
- `docs/architecture/ADR-TEMPLATE.md`
- `docs/DECISION-PROTOCOL.md`
- `docs/TASK.md`
- `docs/ops/cloud-parallel-workflow.md`

## Branch Strategy

1. `develop` -> dev integration
2. `main` -> production release
3. Feature branches always target `develop`
4. Production promotion is done with `develop -> main` PR

## Self Verify Baseline

Preferred:

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

## Project Layout

```text
goal-fund/
  docs/
    PRD.md
    MVP.md
    TASK.md
    DECISION-PROTOCOL.md
    architecture/
      ADR-INDEX.md
      ADR-TEMPLATE.md
      ADR-001-...md ~ ADR-016-...md
      DDD.md
      ERD.md
      ports-and-adapters.md
    qa/
      acceptance-criteria.md
    ops/
      cloud-parallel-workflow.md
      deployment-docker-vm.md
  backend/
  frontend/
  .github/
    PULL_REQUEST_TEMPLATE.md
    ISSUE_TEMPLATE/
      adr_request.md
``` 


