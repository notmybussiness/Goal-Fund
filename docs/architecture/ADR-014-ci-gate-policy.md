# ADR-014: CI Gate Policy (Build-only baseline)

- Status: Accepted
- Date: 2026-02-23
- Owners: Platform, Engineering

## Title

ADR-014: CI Gate Policy (Build-only baseline)

## Context

Team requested simple gates while keeping broken merges out of protected branches.

## Options

### Option A: Build-only required check
- Pros: Very low friction and catches broken integrations.
- Cons: Lower quality signal than full test/lint gates.

### Option B: Build + test + lint required
- Pros: Higher quality assurance.
- Cons: Slower feedback for early MVP.

### Option C: No required checks
- Pros: Fastest merge speed.
- Cons: High breakage risk.

## Recommendation

Recommend Option A per team preference.

## User Decision

- Selected Option: Option A (Build-only required check)
- Decision Date: 2026-02-23
- Approved By: User (Chat)
- Notes: Approved via implementation request for the cloud-parallel governance plan.

## Consequences

### Positive
- Very low-friction quality baseline for parallel squads.
- Broken build merges are prevented in protected branches.

### Negative
- Coverage depth is limited compared to full quality gates.

## Rollback Plan

If build-only proves insufficient, supersede with a stricter CI ADR and roll out incremental test/lint gates.

## Follow-ups

- [x] Add linked tasks after approval.
- [x] Add verification evidence after implementation.

## Related ADRs/Tasks

- ADR-015
- T70
