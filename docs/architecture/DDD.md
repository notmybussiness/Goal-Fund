# DDD Design

문서 버전: v1.0  
작성일: 2026-02-23

## 1. Bounded Contexts

1. Identity
- Aggregate: `User`
- 책임: 인증/권한/프로필

2. Goal Planning
- Aggregate: `Goal`
- 책임: 목표 생성, 상태 추적, 기여금 기록

3. Portfolio
- Aggregate: `Portfolio`
- 책임: 홀딩 구성, 자산 비중 계산

4. Risk Analytics
- Aggregate: `RiskSnapshot`
- 책임: 리스크 기여도/요인 산출

5. Simulation
- Aggregate: `SimulationRun`
- 책임: 목표 달성 확률 계산 및 요약

6. Rebalancing
- Aggregate: `RebalanceProposal`
- 책임: 조정안 생성 및 액션 목록 제공

7. Data Ingestion
- Aggregate: `PriceIngestionJob`
- 책임: 시세 데이터 수집, feature materialization

## 2. Ubiquitous Language

- Goal Target Amount: 목표 금액
- Goal Horizon: 목표 기한
- Risk Contribution: 리스크 기여도
- Probability of Success: 목표 달성 확률
- Rebalance Action: 리밸런싱 액션(BUY/SELL/HOLD)

## 3. Domain Services

1. `GoalProgressService`
2. `RiskAttributionService`
3. `MonteCarloSimulationService`
4. `RebalancePolicyService`
5. `CoachInsightService`

## 4. Domain Events

1. `PriceIngestionRequested`
2. `PriceIngestionCompleted`
3. `SimulationDataRefreshed`

## 5. Invariants

1. 목표 금액은 0보다 커야 한다.
2. 목표 기한은 현재일 이후여야 한다.
3. 포트폴리오 비중 합은 100% 기준으로 정규화 가능해야 한다.
4. 리스크 기여도 합은 100%(허용 오차 내)여야 한다.
5. 시뮬레이션 확률은 0~100 범위여야 한다.

