# ADR-011: Risk Model Definition (Contribution and Factor Exposure)

- Status: Accepted
- Date: 2026-02-23
- Owners: Data, Product

## Title

ADR-011: Risk Model Definition (Contribution and Factor Exposure)

## Context

The product promise depends on explainable risk breakdown in coach views.

## Options

### Option A: Weight-proxy model (simple)
- Pros: Fast MVP and easy explainability.
- Cons: Lower quantitative fidelity.

### Option B: Volatility and covariance based contribution
- Pros: Higher model fidelity.
- Cons: More data and compute complexity.

### Option C: Hybrid phased model
- Pros: MVP speed with clear upgrade path.
- Cons: Model transition communication needed.

## Recommendation

Recommend Option C.

## User Decision

- Selected Option: Option C (Hybrid phased model)
- Decision Date: 2026-02-23
- Approved By: User (Chat)
- Notes: Approved via implementation request for the cloud-parallel governance plan.

## Consequences

### Positive
- Delivers explainability quickly while preserving model upgrade path.
- Reduces MVP delivery risk.

### Negative
- Requires explicit communication when phase transitions occur.

## Rollback Plan

If phased model creates confusion or quality risk, freeze to Option A for MVP and reopen model upgrade in a new ADR.

## Follow-ups

- [x] Add linked tasks after approval.
- [ ] Define transition triggers from phase-1 to phase-2 model.

## Related ADRs/Tasks

- ADR-010
- T40
- T60
