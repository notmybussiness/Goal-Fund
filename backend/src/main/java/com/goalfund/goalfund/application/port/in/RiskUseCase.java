package com.goalfund.goalfund.application.port.in;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface RiskUseCase {

    RiskSnapshotResponse getSnapshot(Long userId, Long portfolioId);

    record RiskContributionItem(
            String symbol,
            BigDecimal riskPercent,
            BigDecimal factorExposureScore
    ) {
    }

    record RiskSnapshotResponse(
            Long portfolioId,
            LocalDateTime snapshotAt,
            BigDecimal volatility,
            BigDecimal expectedMaxDrawdown,
            List<RiskContributionItem> contributions
    ) {
    }
}


