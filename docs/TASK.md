# TASK.md - 목표한푼 Execution Board

Version: v1.2
Date: 2026-02-23

## Mandatory Fields per Task

1. Owner Squad
2. Dependencies
3. Decision ADRs Required
4. Approval Status
5. Approved By
6. Approval Timestamp
7. Blocked Reason (if unapproved)
8. Definition of Done
9. Test Commands
10. Artifacts

## Task State Machine

`Draft -> Awaiting Approval -> Ready -> In Progress -> Done`

Rule: tasks with unresolved ADR dependency remain `Awaiting Approval`.

---

## T00 - Repository Bootstrap and Structure

- Owner Squad: S1, S2
- Dependencies: None
- Decision ADRs Required: ADR-014, ADR-015
- Approval Status: Ready
- Approved By: User (Chat)
- Approval Timestamp: 2026-02-23
- Blocked Reason: None
- Definition of Done:
  1. Baseline directory structure is stable.
  2. Governance docs and templates exist.
- Test Commands:
  1. `rg --files`
- Artifacts:
  1. `README.md`
  2. `docs/**`

## T10 - PRD and MVP Finalization

- Owner Squad: S1
- Dependencies: T00
- Decision ADRs Required: ADR-006, ADR-011
- Approval Status: Ready
- Approved By: User (Chat)
- Approval Timestamp: 2026-02-23
- Blocked Reason: Wait for dependency completion (`T00`) before execution.
- Definition of Done:
  1. PRD/MVP updated with accepted decisions.
- Test Commands:
  1. `rg -n "Success Metrics|Core Feature" docs/PRD.md docs/MVP.md`
- Artifacts:
  1. `docs/PRD.md`
  2. `docs/MVP.md`

## T20 - DDD/ERD/Architecture Baseline

- Owner Squad: S2
- Dependencies: T10
- Decision ADRs Required: ADR-001, ADR-002, ADR-007
- Approval Status: Awaiting Approval
- Approved By: Pending
- Approval Timestamp: Pending
- Blocked Reason: ADR-002 is still Proposed.
- Definition of Done:
  1. DDD/ERD reflect accepted ADRs only.
- Test Commands:
  1. `rg -n "Bounded Contexts|Tables|Status" docs/architecture/*.md`
- Artifacts:
  1. `docs/architecture/DDD.md`
  2. `docs/architecture/ERD.md`

## T30 - Backend Core APIs

- Owner Squad: S3
- Dependencies: T20
- Decision ADRs Required: ADR-003, ADR-004, ADR-006, ADR-007
- Approval Status: Awaiting Approval
- Approved By: Pending
- Approval Timestamp: Pending
- Blocked Reason: ADR-003 and ADR-004 are still Proposed.
- Definition of Done:
  1. Goal, Portfolio, Risk core APIs implemented.
- Test Commands:
  1. `gradle test` (in `backend`)
- Artifacts:
  1. `backend/src/main/java/**`

## T40 - Simulation and Batch

- Owner Squad: S4
- Dependencies: T30
- Decision ADRs Required: ADR-008, ADR-009, ADR-010, ADR-011
- Approval Status: Awaiting Approval
- Approved By: Pending
- Approval Timestamp: Pending
- Blocked Reason: ADR-008 and ADR-009 are still Proposed.
- Definition of Done:
  1. Simulation API and three batch jobs implemented.
- Test Commands:
  1. `gradle test --tests *Simulation*` (in `backend`)
- Artifacts:
  1. `backend/src/main/java/**/batch/*`

## T50 - Rebalancing and Coach APIs

- Owner Squad: S5
- Dependencies: T40
- Decision ADRs Required: ADR-011, ADR-012
- Approval Status: Awaiting Approval
- Approved By: Pending
- Approval Timestamp: Pending
- Blocked Reason: ADR-012 is still Proposed.
- Definition of Done:
  1. Rebalance proposal and coach insight APIs implemented.
- Test Commands:
  1. `gradle test --tests *Rebalance*` (in `backend`)
- Artifacts:
  1. `backend/src/main/java/**/Rebalance*`

## T60 - Frontend Onboarding and Coach UI

- Owner Squad: S6
- Dependencies: T30, T40, T50
- Decision ADRs Required: ADR-006, ADR-011
- Approval Status: Ready
- Approved By: User (Chat)
- Approval Timestamp: 2026-02-23
- Blocked Reason: Wait for dependency completion (`T30`, `T40`, `T50`) before execution.
- Definition of Done:
  1. Required routes and coach cards are connected to accepted contracts.
- Test Commands:
  1. `npm ci && npm run lint && npm run build` (in `frontend`)
- Artifacts:
  1. `frontend/app/**`

## T70 - Integration, E2E, Performance

- Owner Squad: S3, S4, S6
- Dependencies: T60
- Decision ADRs Required: ADR-013, ADR-014
- Approval Status: Awaiting Approval
- Approved By: Pending
- Approval Timestamp: Pending
- Blocked Reason: ADR-013 is still Proposed.
- Definition of Done:
  1. Core E2E and performance checks pass.
- Test Commands:
  1. `npm run test:e2e` (in `frontend`)
  2. `k6 run ...`
- Artifacts:
  1. `docs/qa/acceptance-criteria.md`

## T80 - Deployment and Release Notes

- Owner Squad: S1, S4
- Dependencies: T70
- Decision ADRs Required: ADR-015, ADR-016
- Approval Status: Ready
- Approved By: User (Chat)
- Approval Timestamp: 2026-02-23
- Blocked Reason: Wait for dependency completion (`T70`) before execution.
- Definition of Done:
  1. Deployment guide and release checklist finalized.
- Test Commands:
  1. `docker compose config`
- Artifacts:
  1. `docs/ops/deployment-docker-vm.md`

