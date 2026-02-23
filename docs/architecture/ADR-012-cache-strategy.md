# ADR-012: Cache Strategy (No cache vs Read cache)

- Status: Proposed
- Date: 2026-02-23
- Owners: Backend, Platform

## Title

ADR-012: Cache Strategy (No cache vs Read cache)

## Context

Read-heavy endpoints may need caching, but stale data risk must be controlled.

## Options

### Option A: No cache in MVP
- Pros: Strong correctness simplicity.
- Cons: Potential higher latency and DB load.

### Option B: Read-through cache for snapshots and static metadata
- Pros: Latency reduction for hot endpoints.
- Cons: Staleness controls required.

### Option C: Aggressive cache by default
- Pros: Best response time.
- Cons: Higher correctness risk.

## Recommendation

Recommend Option B with short TTL and explicit bypass paths.

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

- ADR-011
- T50

