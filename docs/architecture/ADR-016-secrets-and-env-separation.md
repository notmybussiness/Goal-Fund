# ADR-016: Secrets and Environment Separation Policy

- Status: Accepted
- Date: 2026-02-23
- Owners: Security, Platform

## Title

ADR-016: Secrets and Environment Separation Policy

## Context

Authentication, DB, and external integrations require strict dev/prod secret isolation.

## Options

### Option A: Separate secret stores per environment
- Pros: Strong isolation and reduced blast radius.
- Cons: More setup overhead.

### Option B: Single secret store with prefixes
- Pros: Simpler management.
- Cons: Misconfiguration risk remains significant.

### Option C: Secrets in repository encrypted files
- Pros: Versioned configuration.
- Cons: Rotation and exposure risk concerns.

## Recommendation

Recommend Option A.

## User Decision

- Selected Option: Option A (Separate secret stores per environment)
- Decision Date: 2026-02-23
- Approved By: User (Chat)
- Notes: Approved via implementation request for the cloud-parallel governance plan.

## Consequences

### Positive
- Reduced blast radius between dev and prod incidents.
- Cleaner compliance and access control boundaries.

### Negative
- More provisioning and secret rotation administration.

## Rollback Plan

If operational overhead is too high, supersede with a controlled single-store policy that preserves strict role separation.

## Follow-ups

- [x] Add linked tasks after approval.
- [ ] Define rotation and emergency break-glass runbook.

## Related ADRs/Tasks

- ADR-003
- ADR-015
- T80
