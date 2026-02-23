# ERD (MVP)

문서 버전: v1.0  
작성일: 2026-02-23

## 1. Tables

1. `users`
2. `auth_identities`
3. `goals`
4. `goal_contributions`
5. `portfolios`
6. `portfolio_holdings`
7. `asset_prices_daily`
8. `risk_snapshots`
9. `risk_contributions`
10. `simulation_runs`
11. `simulation_summaries`
12. `rebalance_policies`
13. `rebalance_proposals`
14. `rebalance_actions`
15. `batch_job_runs`
16. `batch_cursors`

## 2. Relationships

1. `users 1:N goals`
2. `users 1:N portfolios`
3. `portfolios 1:N portfolio_holdings`
4. `goals 1:N goal_contributions`
5. `goals 1:N simulation_runs`
6. `simulation_runs 1:1 simulation_summaries`
7. `portfolios 1:N risk_snapshots`
8. `risk_snapshots 1:N risk_contributions`
9. `portfolios 1:N rebalance_proposals`
10. `rebalance_proposals 1:N rebalance_actions`

## 3. Physical Notes

1. 금액 타입: `NUMERIC(19,4)`
2. 비율 타입: `NUMERIC(7,4)`
3. 시간: `TIMESTAMP WITH TIME ZONE`
4. Soft delete 미사용(MVP), 상태 플래그로 관리

## 4. Index Plan

1. `goals(user_id, status)`
2. `portfolio_holdings(portfolio_id, symbol)` unique
3. `asset_prices_daily(symbol, trading_date)` unique
4. `risk_snapshots(portfolio_id, snapshot_at)`
5. `simulation_runs(goal_id, created_at)`
6. `rebalance_proposals(portfolio_id, created_at)`
7. `batch_job_runs(job_name, started_at)`
8. `batch_cursors(job_name, cursor_key)` unique

