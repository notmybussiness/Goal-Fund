# ADR-015: Dev/Prod Branch Deployment Strategy (develop/main mapping)

- Status: Accepted
- Date: 2026-02-23
- Owners: Platform, Engineering

## Title

ADR-015: Dev/Prod Branch Deployment Strategy (develop/main mapping)

## Context

The team needs clean environment separation with simple branch semantics.

## Options

### Option A: develop -> dev, main -> prod
- Pros: Clear release flow and environment isolation.
- Cons: Requires disciplined merge flow.

### Option B: Single branch deploy with env toggles
- Pros: Simple branch model.
- Cons: Higher risk of accidental prod impact.

### Option C: Separate repositories per environment
- Pros: Strong isolation.
- Cons: Sync overhead and duplication.

## Recommendation

Recommend Option A.

## User Decision

- Selected Option: Option A (develop -> dev, main -> prod)
- Decision Date: 2026-02-23
- Approved By: User (Chat)
- Notes: Approved via implementation request for the cloud-parallel governance plan.

## Consequences

### Positive
- Predictable release progression and rollback path.
- Clear ownership split between integration and production stability.

### Negative
- Requires branch discipline and release checklist enforcement.

## Rollback Plan

If branch mapping causes delivery friction, supersede with a release-train ADR while preserving production stability constraints.

## Follow-ups

- [x] Add linked tasks after approval.
- [ ] Define release promotion checklist template.

## Related ADRs/Tasks

- ADR-014
- ADR-016
- T80
