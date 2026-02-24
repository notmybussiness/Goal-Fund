# Acceptance Criteria

Version: v1.1  
Date: 2026-02-24

## 1. Domain Test Scenarios

1. Goal progress calculation
   - Given: target amount 100,000,000 / current amount 30,000,000 / monthly contribution 1,000,000
   - Expect: progress percent 30%
2. Risk contribution normalization
   - Given: contribution list
   - Expect: sum is 100% (within tolerance 0.01)
3. Simulation probability range
   - Given: n simulation scenarios
   - Expect: `0 <= successProbabilityPercent <= 100`
4. Rebalance action consistency
   - Given: proposal action list
   - Expect: buy/sell actions reduce target allocation gaps

## 2. API Integration Scenarios

1. Goal CRUD ownership and visibility checks
2. Portfolio and holding reference integrity checks
3. Simulation run create/get flow checks
4. Batch run API and downstream risk snapshot reflection checks

## 3. E2E Scenarios

1. Onboarding goal form persists payload in browser storage
2. Onboarding portfolio form persists normalized symbol payload
3. Coach dashboard route renders and responds to query context
4. Risk/simulation/rebalance pages render without runtime failure

## 4. Performance Criteria

1. Simulation API p95 <= 3s
2. Risk snapshot API p95 <= 500ms
3. Coach insights API p95 <= 1s
4. Batch jobs complete daily run without failure

## 5. Execution Commands

1. Unit/integration tests
   - Frontend: `npm run test` (in `frontend`)
   - Backend: `gradle test` (in `backend`, CI-managed)
2. E2E tests
   - `npm run test:e2e` (in `frontend`)
3. Perf smoke
   - `k6 run perf/k6/smoke.js`
