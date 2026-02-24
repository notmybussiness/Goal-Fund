## Summary

- Task ID:
- Scope:

## Read Gate (Required)

- [ ] `docs/DECISION-PROTOCOL.md` reviewed
- [ ] `docs/architecture/ADR-INDEX.md` reviewed
- [ ] `docs/TASK.md` reviewed
- [ ] `.github/PULL_REQUEST_TEMPLATE.md` reviewed

## ADR Check (Required)

- Linked ADR IDs: ADR-
- ADR status check: Accepted
- User approval date:
- Options considered summary:

## Task Gate Check

- [ ] TASK item is `Ready`
- [ ] Decision ADRs Required are accepted
- [ ] Approval metadata filled in `docs/TASK.md`

## Self Verify Evidence (Required)

- Backend: `gradle test`
- Frontend: `npm ci && npm run lint && npm run build`
- API behavior check (integration test or manual endpoint proof):
- Risks/rollback notes:

## TDD Gate (Required for `feat/*` and `fix/*`)

- [ ] RED step verified (failing test command + expected failure summary)
- [ ] GREEN step verified (passing test command + pass summary)
- [ ] Tests were added or updated for changed behavior
- [ ] Regression test added (`fix/*` only)

## Branch and Release Check

- [ ] Base branch is `develop`
- [ ] Production promotion follows `develop -> main`

## Notes
