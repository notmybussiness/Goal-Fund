# Changelog

## [Unreleased]

### Added

1. Playwright E2E suite for onboarding and coach routes.
2. k6 smoke script for goals/risk/coach/simulation endpoints.
3. Batch scheduler wiring with cron configuration.
4. Task automation scripts:
   - `scripts/task-start.ps1`
   - `scripts/task-report.ps1`
   - `scripts/task-pr.ps1`
5. CI metadata gate: `tdd-evidence-check`.

### Changed

1. Frontend test scope restored to project tests only (`vitest` exclude defaults).
2. Coach dashboard request context handling aligned with query params.
3. PR template includes explicit TDD gate checklist.
4. Governance docs updated for parallel lane + TDD flow.

## [v0.1.0-mvp] (planned)

Planned release baseline:

1. Goal onboarding + portfolio onboarding flows
2. Coach pages (dashboard/risk/simulation/rebalance)
3. Backend goal/portfolio/risk/simulation/rebalance/coach APIs
4. CI required checks including E2E and perf smoke

