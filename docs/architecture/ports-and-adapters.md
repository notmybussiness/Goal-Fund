# Ports and Adapters Design

Version: v1.1  
Date: 2026-02-24

## 1. Principles

1. Domain and application layers must not depend on framework details.
2. Application contracts are expressed through inbound/outbound ports.
3. Adapters implement ports and connect web, batch, DB, and external APIs.

## 2. Package Convention

```text
com.goalfund.goalfund
  domain/
  application/
    port/in
    port/out
    service
  adapter/
    in/web
    out/memory or out/jpa
  infrastructure/
```

## 3. Inbound Ports

1. `GoalUseCase`
2. `PortfolioUseCase`
3. `RiskUseCase`
4. `SimulationUseCase`
5. `RebalanceUseCase`
6. `CoachUseCase`

## 4. Outbound Ports

1. `GoalRepositoryPort`
2. `PortfolioRepositoryPort`
3. `RiskSnapshotRepositoryPort`
4. `SimulationRepositoryPort`
5. `RebalanceRepositoryPort`
6. `PriceSeriesPort`

## 5. Adapter Mapping

1. REST controller -> inbound port
2. Batch scheduler/job -> inbound port
3. JPA repository adapter -> outbound port
4. External market client -> `PriceSeriesPort`
5. Cache adapter -> read model acceleration

