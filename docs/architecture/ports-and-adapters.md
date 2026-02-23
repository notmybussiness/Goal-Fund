# Ports and Adapters Design

臾몄꽌 踰꾩쟾: v1.0  
?묒꽦?? 2026-02-23

## 1. 援ъ“ ?먯튃

- ?꾨찓?몄? ?꾨젅?꾩썙?ъ뿉 ?섏〈?섏? ?딅뒗??
- ?좏뵆由ъ??댁뀡? ?ы듃(interface)濡??몃? ?섏〈??異붿긽?뷀븳??
- ?대뙌?곕뒗 ?ы듃 援ы쁽泥대줈 諛곗튂/??DB/?몃? API瑜??곌껐?쒕떎.

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

1. REST Controller -> Inbound Port
2. Batch Job/Scheduler -> Inbound Port
3. JPA Repository Adapter -> Outbound Port
4. External Market Client Adapter -> PriceSeriesPort
5. Cache Adapter -> Read-model acceleration


