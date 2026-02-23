# ADR Index

This file is the single source of truth for decision status and traceability.

| ADR ID | Title | Status | Depends On | Approval Date | Approved By |
|---|---|---|---|---|---|
| ADR-001 | Modular Monolith + Hexagonal Architecture | Accepted | - | 2026-02-23 | User (Chat) |
| ADR-002 | Database Topology (Single PostgreSQL vs Multi DB) | Proposed | ADR-001 | Pending | Pending |
| ADR-003 | Authentication Strategy (JWT + Social) | Proposed | ADR-016 | Pending | Pending |
| ADR-004 | Authorization Model (Single Role vs RBAC) | Proposed | ADR-003 | Pending | Pending |
| ADR-005 | Database Migration Tool | Proposed | ADR-002 | Pending | Pending |
| ADR-006 | API Versioning Policy | Accepted | ADR-001 | 2026-02-23 | User (Chat) |
| ADR-007 | Numeric Precision Policy | Accepted | ADR-001 | 2026-02-23 | User (Chat) |
| ADR-008 | Batch Runtime Model | Proposed | ADR-001 | Pending | Pending |
| ADR-009 | Batch Retry and Cursor Policy | Proposed | ADR-008 | Pending | Pending |
| ADR-010 | Simulation Parameter Governance | Accepted | ADR-007 | 2026-02-23 | User (Chat) |
| ADR-011 | Risk Model Definition | Accepted | ADR-010 | 2026-02-23 | User (Chat) |
| ADR-012 | Cache Strategy | Proposed | ADR-011 | Pending | Pending |
| ADR-013 | Logging and Observability Stack | Proposed | ADR-014, ADR-015 | Pending | Pending |
| ADR-014 | CI Gate Policy (Build-only baseline) | Accepted | - | 2026-02-23 | User (Chat) |
| ADR-015 | Dev/Prod Branch Deployment Strategy | Accepted | ADR-014, ADR-016 | 2026-02-23 | User (Chat) |
| ADR-016 | Secrets and Environment Separation Policy | Accepted | - | 2026-02-23 | User (Chat) |

## Status Rules

- Proposed: Drafted, waiting for user decision.
- Accepted: Explicit user approval recorded.
- Rejected: Not selected.
- Superseded: Replaced by a newer ADR.

## Governance Rules

1. No implementation starts if required ADR status is not `Accepted`.
2. Every PR must reference at least one ADR ID.
3. Approval metadata must be updated in both ADR file and this index.
