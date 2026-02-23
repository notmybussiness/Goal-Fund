# ADR-005: Database Migration Tool (Flyway vs Liquibase vs Manual)

- Status: Proposed
- Date: 2026-02-23
- Owners: Backend, Platform

## Title

ADR-005: Database Migration Tool (Flyway vs Liquibase vs Manual)

## Context

Schema evolution must be reproducible across dev and prod with auditability.

## Options

### Option A: Flyway SQL-first migrations
- Pros: Simple workflow and high team familiarity.
- Cons: Advanced branching conflict handling is manual.

### Option B: Liquibase changelog-based migrations
- Pros: Rich features and diff tooling.
- Cons: Heavier setup and cognitive load.

### Option C: Manual SQL scripts only
- Pros: No extra tool dependency.
- Cons: Weak guardrails and high drift risk.

## Recommendation

Recommend Option A for MVP.

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

- ADR-002
- ADR-015
- T40

