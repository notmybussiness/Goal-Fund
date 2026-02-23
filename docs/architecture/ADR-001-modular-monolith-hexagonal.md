# ADR-001: Modular Monolith + Hexagonal Architecture

- Status: Accepted
- Date: 2026-02-23
- Owners: Platform, Backend

## Title

ADR-001: Modular Monolith + Hexagonal Architecture

## Context

목표한푼 requires clear domain boundaries but must avoid early distributed-system complexity in MVP.

## Options

### Option A: Modular Monolith + Hexagonal
- Pros: Fast delivery, low ops overhead, clear domain boundaries.
- Cons: Single deploy unit can become large over time.

### Option B: Microservices from day one
- Pros: Independent scaling and deployment per domain.
- Cons: High initial complexity and coordination overhead.

### Option C: Classic layered monolith only
- Pros: Very simple implementation path.
- Cons: Weak boundaries and harder future extraction.

## Recommendation

Option A is recommended for MVP speed and boundary discipline.

## User Decision

- Selected Option: Option A (Modular Monolith + Hexagonal)
- Decision Date: 2026-02-23
- Approved By: User (Chat)
- Notes: Approved via implementation request for the cloud-parallel governance plan.

## Consequences

### Positive
- Clean boundary model without microservice overhead.
- Easier migration path to future service split.

### Negative
- Shared runtime blast radius.
- Requires strict module boundary governance.

## Rollback Plan

If module boundaries degrade, introduce architecture tests and split high-change domains first.

## Follow-ups

- [x] Add architecture boundary checks.
- [ ] Define service extraction criteria.

## Related ADRs/Tasks

- ADR-006
- ADR-008
- T20

