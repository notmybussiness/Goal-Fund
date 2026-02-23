# ADR-008: Batch Runtime Model (In-process vs External Worker)

- Status: Proposed
- Date: 2026-02-23
- Owners: Backend, Platform

## Title

ADR-008: Batch Runtime Model (In-process vs External Worker)

## Context

Daily ingestion and feature refresh jobs are required for simulation input quality.

## Options

### Option A: In-process batch module in backend
- Pros: Simple deployment and shared domain code.
- Cons: Resource contention with API workload.

### Option B: Separate worker service
- Pros: Isolation and independent scaling.
- Cons: More deployment and observability overhead.

### Option C: External orchestrator from day one
- Pros: Strong workflow controls.
- Cons: Too heavy for MVP.

## Recommendation

Recommend Option A for MVP with extraction criteria later.

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
- ADR-009
- T40

