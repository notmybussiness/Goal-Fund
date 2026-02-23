# ADR-007: Numeric Precision Policy (Money and Percent Scale)

- Status: Accepted
- Date: 2026-02-23
- Owners: Backend, Data

## Title

ADR-007: Numeric Precision Policy (Money and Percent Scale)

## Context

Simulation, risk, and rebalancing require deterministic decimal precision.

## Options

### Option A: Decimal fixed scales per domain type
- Pros: Deterministic calculations and auditability.
- Cons: Requires strict validation at boundaries.

### Option B: Floating point for runtime, decimal at persistence
- Pros: Potential runtime speed in some contexts.
- Cons: Rounding drift risk.

### Option C: Integer minor-units for all numbers
- Pros: Exact arithmetic for money.
- Cons: Percent and ratio handling becomes verbose.

## Recommendation

Recommend Option A (money and percent explicit scales).

## User Decision

- Selected Option: Option A (Fixed decimal scale policy)
- Decision Date: 2026-02-23
- Approved By: User (Chat)
- Notes: Approved via implementation request for the cloud-parallel governance plan.

## Consequences

### Positive
- Deterministic cross-module calculation behavior.
- Easier audit and reproducibility.

### Negative
- Additional boundary validation complexity.

## Rollback Plan

If fixed scales block model evolution, add a replacement ADR for scale extension and migration path.

## Follow-ups

- [x] Add linked tasks after approval.
- [ ] Document Money/Percent scale constants in code guidelines.

## Related ADRs/Tasks

- ADR-010
- ADR-011
- T30
