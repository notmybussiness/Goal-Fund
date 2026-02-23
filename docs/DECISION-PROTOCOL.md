# Decision Protocol

This protocol enforces pre-approval for all technical decisions.

## 1. Scope of Mandatory ADR

ADR is required when changes involve:

1. Architecture, data model, deployment, security, CI gates.
2. New or replacement external dependencies.
3. Changes with material cost, performance, or operations risk.

## 2. Mandatory Read Gate

Before task work starts, read in this exact order:

1. `docs/DECISION-PROTOCOL.md`
2. `docs/architecture/ADR-INDEX.md`
3. `docs/TASK.md`
4. `.github/PULL_REQUEST_TEMPLATE.md`

## 3. Hard Stop Rule

Before user approval:

1. No code, schema, or configuration changes.
2. Only research notes and ADR drafts are allowed.

## 4. Approval Flow

1. Create ADR draft in `docs/architecture`.
2. Present 2-3 options with one recommended option.
3. Request user decision in fixed format:
   - Decision topic
   - Options A/B/C
   - Recommended option with rationale
   - Impact scope (code/ops/timeline)
4. Record decision in ADR + `ADR-INDEX.md`.
5. Mark linked tasks unblocked only after approval.

## 5. Task and PR Traceability Rules

1. Every implementation PR must reference at least one ADR ID.
2. `TASK.md` must include decision dependency fields.
3. PR must include self-verify command evidence.
4. Release checklist must verify that all major changes map to accepted ADRs.

## 6. Governance Cadence

1. Weekly ADR review: unresolved `Proposed` items.
2. Release gate: reject release if major change has no accepted ADR mapping.
3. Branch mapping: `develop` for dev integration, `main` for production promotion.
