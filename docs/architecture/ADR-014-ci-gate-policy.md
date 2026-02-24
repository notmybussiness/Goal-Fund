# ADR-014: CI Gate Policy (Quality Baseline)

- Status: Accepted
- Date: 2026-02-24
- Owners: Platform, Engineering

## Title

ADR-014: CI Gate Policy (Quality Baseline)

## Context

Parallel lanes require a consistent merge gate to prevent regressions and incomplete TDD evidence.

## Options

### Option A: Build-only required checks
- Pros: Fast feedback
- Cons: Weak regression protection

### Option B: Build + lint + tests + E2E/perf + metadata gate
- Pros: Strong merge safety and traceable evidence
- Cons: Longer CI runtime

### Option C: No required checks
- Pros: Fastest merge speed
- Cons: High breakage risk

## Recommendation

Recommend Option B.

## User Decision

- Selected Option: Option B
- Decision Date: 2026-02-24
- Approved By: User (Chat)
- Notes: Accepted while implementing T70/T80 closeout and TDD enforcement.

## Consequences

### Positive
- Prevents most broken merges before integration.
- Makes TDD evidence auditable in PR metadata.
- Adds E2E/perf confidence to release PRs.

### Negative
- CI duration increases.
- Requires repository ruleset update for full enforcement.

## Rollback Plan

If CI runtime becomes a blocker, reduce required checks in stages while keeping `backend-build`, `frontend-build`, and `tdd-evidence-check`.

## Follow-ups

- [x] Add E2E and perf jobs to workflow.
- [x] Add `tdd-evidence-check` job.
- [ ] Mark all checks as required in GitHub ruleset.

## Related ADRs/Tasks

- ADR-013
- ADR-015
- T70
- T80

