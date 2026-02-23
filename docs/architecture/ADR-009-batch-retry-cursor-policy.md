# ADR-009: Batch Retry and Cursor Policy

- Status: Proposed
- Date: 2026-02-23
- Owners: Backend, Platform

## Title

ADR-009: Batch Retry and Cursor Policy

## Context

Batch failures must recover safely without duplicate destructive effects.

## Options

### Option A: Idempotent job + cursor resume + bounded retries
- Pros: Reliable recovery with controlled repeat behavior.
- Cons: Requires careful state modeling.

### Option B: Fail-fast without resume
- Pros: Simple implementation.
- Cons: High manual recovery cost.

### Option C: Infinite auto-retry
- Pros: Eventually recovers transient failures.
- Cons: Can mask persistent issues and waste resources.

## Recommendation

Recommend Option A.

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

- ADR-008
- T40

