# ADR-003: Authentication Strategy (JWT + Social)

- Status: Proposed
- Date: 2026-02-23
- Owners: Backend, Security

## Title

ADR-003: Authentication Strategy (JWT + Social)

## Context

The product requires account persistence across devices with social login convenience and API statelessness.

## Options

### Option A: JWT access + refresh with social login
- Pros: Good UX and stateless API scaling.
- Cons: Token lifecycle and revocation handling required.

### Option B: Server session only
- Pros: Simple revocation and server-side control.
- Cons: Scaling and cross-service integration complexity.

### Option C: OAuth provider token passthrough only
- Pros: Less internal token management.
- Cons: Strong provider coupling and weaker portability.

## Recommendation

Recommend Option A with strict secret and refresh-token rotation policy.

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

- ADR-016
- T30

