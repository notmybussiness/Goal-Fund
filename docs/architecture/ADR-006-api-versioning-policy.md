# ADR-006: API Versioning Policy (/api/v1 retention strategy)

- Status: Accepted
- Date: 2026-02-23
- Owners: Backend, Frontend

## Title

ADR-006: API Versioning Policy (/api/v1 retention strategy)

## Context

Frontend and backend will evolve in parallel branches and need stable API contracts.

## Options

### Option A: Path versioning (/api/v1)
- Pros: Clear compatibility contract and easy routing.
- Cons: Version bump requires path duplication.

### Option B: Header-based versioning
- Pros: Cleaner URLs.
- Cons: Harder debugging and tooling visibility.

### Option C: No explicit versioning
- Pros: Fastest short-term evolution.
- Cons: High breaking-change risk.

## Recommendation

Recommend Option A.

## User Decision

- Selected Option: Option A (Path versioning /api/v1)
- Decision Date: 2026-02-23
- Approved By: User (Chat)
- Notes: Approved via implementation request for the cloud-parallel governance plan.

## Consequences

### Positive
- Clear contract for frontend and backend parallel delivery.
- Backward compatibility policy becomes explicit.

### Negative
- Future major version migrations require path-level duplication.

## Rollback Plan

If path versioning causes unacceptable overhead, deprecate with a migration ADR and transition to header-based versioning.

## Follow-ups

- [x] Add linked tasks after approval.
- [ ] Add version deprecation checklist.

## Related ADRs/Tasks

- ADR-001
- T30
- T60
