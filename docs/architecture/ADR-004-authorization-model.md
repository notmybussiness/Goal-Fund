# ADR-004: Authorization Model (Single Role vs RBAC)

- Status: Proposed
- Date: 2026-02-23
- Owners: Backend, Security

## Title

ADR-004: Authorization Model (Single Role vs RBAC)

## Context

MVP currently targets individual users but must be ready for possible advisor/admin roles later.

## Options

### Option A: Single user role only
- Pros: Minimal implementation complexity.
- Cons: Limited extensibility for admin or support operations.

### Option B: Full RBAC from MVP
- Pros: Strong extensibility and governance.
- Cons: Higher initial complexity and policy overhead.

### Option C: Single role now with RBAC-ready schema
- Pros: Balanced MVP speed and future readiness.
- Cons: Some upfront modeling discipline is needed.

## Recommendation

Recommend Option C.

## User Decision

- Selected Option: Pending
- Decision Date: Pending
- Approved By: Pending
- Notes: Pending user approval.

## Consequences

### Positive
- Decision trade-offs are explicitly documented before implementation.

### Negative
- Extra upfront discussion time is required.

## Rollback Plan

If the chosen option fails, revert to the previous baseline and mark this ADR as Superseded with a replacement ADR.

## Follow-ups

- [ ] Add linked tasks after approval.
- [ ] Add verification evidence after implementation.

## Related ADRs/Tasks

- ADR-003
- T30

