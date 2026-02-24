# Goal Fund PRD

Version: v1.2  
Date: 2026-02-24  
Stage: MVP

## 1. Product Vision

Goal Fund helps Korean individual investors make portfolio decisions from a goal-first perspective (target amount + deadline), not only from short-term return perspective.

## 2. Target Users

1. Individual investors who manage stock/ETF portfolios
2. Users who prefer goal completion decisions over return-only dashboards

## 3. Problem Statement

Most retail investment tools summarize return history, but do not connect:

1. Target amount and target date
2. Current portfolio risk structure
3. Actionable next-step recommendations

Goal Fund provides one connected workflow from onboarding to coach insight.

## 4. Goals and Non-goals

### Goals (MVP)

1. Goal creation and tracking
2. Portfolio and holdings input
3. Risk one-page snapshot
4. Monte Carlo goal probability simulation
5. Rebalancing proposal generation
6. Coach insight cards

### Non-goals (MVP)

1. Full AI/RAG advisor
2. Broker order execution
3. Full historical backtest integration

## 5. Success Metrics

1. Goal onboarding completion rate >= 75%
2. Goal onboarding -> simulation completion >= 60%
3. Simulation API p95 <= 3s
4. Risk snapshot API p95 <= 500ms
5. Core regression checks pass rate = 100%
6. Batch daily run success >= 7 consecutive days

## 6. User Journey

1. User enters goal target and deadline
2. User enters portfolio holdings and weights
3. User reviews risk dashboard
4. User checks simulation success probability
5. User receives rebalancing and coach guidance

## 7. Functional Requirements

1. Goal CRUD: `/api/v1/goals`
2. Portfolio and holdings: `/api/v1/portfolios`, `/api/v1/holdings`
3. Risk snapshot: `/api/v1/risk/snapshot`
4. Simulation run/create: `/api/v1/simulation/runs`
5. Rebalance proposals: `/api/v1/rebalance/proposals`
6. Coach insights: `/api/v1/coach/insights`

## 8. Non-functional Requirements

1. Context-based ownership validation
2. Decimal-safe numeric calculations for money and weights
3. Idempotent and cursor-safe batch execution
4. Observability baseline for API latency/failure/batch status

