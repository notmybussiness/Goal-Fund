# TASK.md - Goal Fund Execution Board

Version: v1.5  
Date: 2026-02-24  
Last Synced: T70 closeout lane (`feat/T70-e2e-perf-gate`)

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
11. TDD Required (`Yes/No`)
12. RED Evidence
13. GREEN Evidence
14. Regression Test Added (`Yes/No`, required for `fix/*`)

## Task State Machine

`Draft -> Awaiting Approval -> Ready -> In Progress -> Done`

State rule:
1. Tasks with unresolved ADR dependencies stay `Awaiting Approval`.
2. `In Progress -> Done` requires evidence fields completed.
3. For `TDD Required: Yes`, RED/GREEN evidence is mandatory.

---

## Current Snapshot

1. `main` includes release PR #9 (`develop -> main`) and is source of truth.
2. T60 hardcoded context fixes are included via PR #8.
3. T70 baseline implementation is present in this lane:
   - Playwright E2E specs and CI job
   - k6 smoke script and CI job
   - Batch scheduler and cron defaults
4. Repository rulesets for `develop` and `main` now require:
   - `backend-test`, `backend-build`, `frontend-lint`, `frontend-build`
   - `frontend-e2e`, `perf-smoke`, `tdd-evidence-check`
5. ADR-013 is accepted with Option A baseline.
6. Remaining MVP closeout items are CI proof capture and release-tag execution.

---

## T00 - Repository Bootstrap and Structure

- Owner Squad: S1, S2
- Dependencies: None
- Decision ADRs Required: ADR-014, ADR-015
- Approval Status: Done
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
- TDD Required: No
- RED Evidence: N/A
- GREEN Evidence: Baseline docs and structure validated.
- Regression Test Added: No

## T10 - PRD and MVP Finalization

- Owner Squad: S1
- Dependencies: T00
- Decision ADRs Required: ADR-006, ADR-011
- Approval Status: Done
- Approved By: User (Chat)
- Approval Timestamp: 2026-02-23
- Blocked Reason: None
- Definition of Done:
  1. PRD/MVP updated with accepted decisions.
- Test Commands:
  1. `rg -n "Success Metrics|Core Feature" docs/PRD.md docs/MVP.md`
- Artifacts:
  1. `docs/PRD.md`
  2. `docs/MVP.md`
- TDD Required: No
- RED Evidence: N/A
- GREEN Evidence: Documents present and versioned.
- Regression Test Added: No

## T20 - DDD/ERD/Architecture Baseline

- Owner Squad: S2
- Dependencies: T10
- Decision ADRs Required: ADR-001, ADR-002, ADR-007
- Approval Status: Awaiting Approval
- Approved By: Pending
- Approval Timestamp: Pending
- Blocked Reason: ADR-002 is still `Proposed`.
- Definition of Done:
  1. DDD/ERD reflect accepted ADRs only.
- Test Commands:
  1. `rg -n "Bounded Contexts|Tables|Status" docs/architecture/*.md`
- Artifacts:
  1. `docs/architecture/DDD.md`
  2. `docs/architecture/ERD.md`
- TDD Required: No
- RED Evidence: Pending task start.
- GREEN Evidence: Pending task completion.
- Regression Test Added: No

## T30 - Backend Core APIs

- Owner Squad: S3
- Dependencies: T20
- Decision ADRs Required: ADR-003, ADR-004, ADR-006, ADR-007
- Approval Status: Done
- Approved By: User (Chat) + merged PR flow
- Approval Timestamp: 2026-02-23
- Blocked Reason: None
- Definition of Done:
  1. Goal, Portfolio, Risk core APIs implemented.
- Test Commands:
  1. `backend-test` (required check)
  2. `backend-build` (required check)
- Artifacts:
  1. `backend/src/main/java/**`
- TDD Required: Yes
- RED Evidence: Captured in implementation PR evidence.
- GREEN Evidence: CI `backend-test` and `backend-build` passed on merged PR.
- Regression Test Added: N/A

## T40 - Simulation and Batch

- Owner Squad: S4
- Dependencies: T30
- Decision ADRs Required: ADR-008, ADR-009, ADR-010, ADR-011
- Approval Status: Done
- Approved By: User (Chat) + merged PR flow
- Approval Timestamp: 2026-02-23
- Blocked Reason: None
- Definition of Done:
  1. Simulation API and three batch jobs implemented.
- Test Commands:
  1. `backend-test` (required check)
  2. `backend-build` (required check)
- Artifacts:
  1. `backend/src/main/java/**/batch/*`
  2. `backend/src/main/java/**/Simulation*`
- TDD Required: Yes
- RED Evidence: Captured in implementation PR evidence.
- GREEN Evidence: CI `backend-test` and `backend-build` passed on merged PR.
- Regression Test Added: N/A

## T50 - Rebalancing and Coach APIs

- Owner Squad: S5
- Dependencies: T40
- Decision ADRs Required: ADR-011, ADR-012
- Approval Status: Done
- Approved By: User (Chat) + merged PR flow
- Approval Timestamp: 2026-02-23
- Blocked Reason: None
- Definition of Done:
  1. Rebalance proposal and coach insight APIs implemented.
- Test Commands:
  1. `backend-test` (required check)
  2. `backend-build` (required check)
- Artifacts:
  1. `backend/src/main/java/**/Rebalance*`
  2. `backend/src/main/java/**/Coach*`
- TDD Required: Yes
- RED Evidence: Captured in implementation PR evidence.
- GREEN Evidence: CI `backend-test` and `backend-build` passed on merged PR.
- Regression Test Added: N/A

## T60 - Frontend Onboarding and Coach UI

- Owner Squad: S6
- Dependencies: T30, T40, T50
- Decision ADRs Required: ADR-006, ADR-011
- Approval Status: Done
- Approved By: User (Chat) + merged PR flow
- Approval Timestamp: 2026-02-24
- Blocked Reason: None
- Definition of Done:
  1. Required routes and coach cards are connected to accepted contracts.
  2. Query-based coach context issue fixed (`goal/user/portfolio` alignment).
- Test Commands:
  1. `npm run test` (in `frontend`)
  2. `npm run lint` (in `frontend`)
  3. `npm run build` (in `frontend`)
- Artifacts:
  1. `frontend/app/**`
  2. `frontend/lib/api.ts`
  3. `frontend/lib/coachContext.ts`
- TDD Required: Yes
- RED Evidence: Captured in PR #8 review/fix cycle.
- GREEN Evidence: Frontend test/lint/build checks passed on merged PR.
- Regression Test Added: Yes (coach context alignment)

## T70 - Integration, E2E, Performance

- Owner Squad: S3, S4, S6
- Dependencies: T60
- Decision ADRs Required: ADR-013, ADR-014
- Approval Status: In Progress
- Approved By: User (Chat)
- Approval Timestamp: 2026-02-24
- Blocked Reason: Waiting for CI run evidence of `perf-smoke` in branch workflow.
- Definition of Done:
  1. Core E2E and performance checks pass.
  2. CI includes reproducible E2E/perf gate strategy.
  3. Daily batch scheduling is enabled in application runtime.
- Test Commands:
  1. `npm run test` (in `frontend`)
  2. `npm run lint` (in `frontend`)
  3. `npm run build` (in `frontend`)
  4. `npm run test:e2e` (in `frontend`)
  5. `k6 run perf/k6/smoke.js`
- Artifacts:
  1. `frontend/e2e/**`
  2. `frontend/playwright.config.ts`
  3. `perf/k6/smoke.js`
  4. `.github/workflows/build.yml`
  5. `backend/src/main/java/**/BatchScheduler.java`
  6. `docs/qa/acceptance-criteria.md`
- TDD Required: Yes
- RED Evidence:
  1. `npm run test` failed due `node_modules` test discovery after exclude override.
  2. Failure reason: missing imports from third-party test files and unrelated suites executed.
- GREEN Evidence:
  1. `npm run test` -> 22 passed.
  2. `npm run lint` -> pass.
  3. `npm run build` -> pass.
  4. `npm run test:e2e` -> 6 passed.
  5. `k6 run perf/k6/smoke.js` baseline script exists; full green in CI/backend boot context.
- Regression Test Added: No

## T80 - Deployment and Release Notes

- Owner Squad: S1, S4
- Dependencies: T70
- Decision ADRs Required: ADR-015, ADR-016
- Approval Status: In Progress
- Approved By: Pending
- Approval Timestamp: Pending
- Blocked Reason: Wait for T70 completion and required-check ruleset enforcement.
- Definition of Done:
  1. Deployment guide and release checklist finalized.
  2. MVP release changelog and tag plan are prepared.
- Test Commands:
  1. `docker compose config`
- Artifacts:
  1. `docs/ops/deployment-docker-vm.md`
  2. `README.md`
  3. `docs/MVP.md`
  4. `CHANGELOG.md`
- TDD Required: No
- RED Evidence: N/A
- GREEN Evidence: Pending closeout updates in this lane.
- Regression Test Added: No

---

## Next Work Queue (MVP Closeout)

1. T70-5: Capture CI evidence for `frontend-e2e`, `perf-smoke`, `tdd-evidence-check`.
2. T80-2: Cut MVP baseline tag after merge and publish changelog.

### Suggested Branch Names

1. `chore/T70-ci-evidence-capture`
2. `chore/T80-mvp-tag-changelog`
