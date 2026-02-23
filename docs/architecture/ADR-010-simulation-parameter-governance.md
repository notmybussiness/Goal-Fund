# ADR-010: Simulation Parameter Governance

- Status: Accepted
- Date: 2026-02-23
- Owners: Data, Backend

## Title

ADR-010: Simulation Parameter Governance

## Context

Monte Carlo outcomes are sensitive to parameter ranges and update cadence.

## Options

### Option A: Fixed baseline parameters in config
- Pros: Deterministic behavior and easy audit.
- Cons: May lag market regime changes.

### Option B: Dynamic parameters from data pipeline
- Pros: More adaptive model behavior.
- Cons: Higher validation and drift risk.

### Option C: Hybrid: fixed defaults with controlled override
- Pros: Balanced control and adaptability.
- Cons: Governance process needed for overrides.

## Recommendation

Recommend Option C.

## User Decision

- Selected Option: Option C (Hybrid fixed defaults + controlled override)
- Decision Date: 2026-02-23
- Approved By: User (Chat)
- Notes: Approved via implementation request for the cloud-parallel governance plan.

## Consequences

### Positive
- Deterministic default behavior for MVP.
- Controlled adaptation path without fully dynamic drift.

### Negative
- Requires explicit override governance workflow.

## Rollback Plan

If override governance becomes operationally heavy, revert to Option A and document override removal through a superseding ADR.

## Follow-ups

- [x] Add linked tasks after approval.
- [ ] Define override approval checklist.

## Related ADRs/Tasks

- ADR-007
- ADR-011
- T40
