# ADR-002: Database Topology (Single PostgreSQL vs Multi DB)

- Status: Proposed
- Date: 2026-02-23
- Owners: Backend, Platform

## Title

ADR-002: Database Topology (Single PostgreSQL vs Multi DB)

## Context

MVP needs consistent data integrity and low ops burden while keeping room for future domain split.

## Options

### Option A: Single PostgreSQL instance
- Pros: Lowest operational complexity and easy transactional consistency.
- Cons: Shared resource contention at scale.

### Option B: Domain-separated multiple PostgreSQL databases
- Pros: Isolation by domain and independent scaling.
- Cons: Higher migration and operational complexity.

### Option C: Hybrid: single now, split later with migration plan
- Pros: Fast MVP delivery and clear growth path.
- Cons: Future migration effort is unavoidable.

## Recommendation

Recommend Option C for MVP speed with an explicit split threshold.

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

- ADR-001
- ADR-015
- T30

