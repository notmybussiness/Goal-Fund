package com.goalfund.goalfund.domain.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record RiskSnapshot(
        Long portfolioId,
        LocalDateTime snapshotAt,
        BigDecimal volatility,
        BigDecimal expectedMaxDrawdown,
        List<RiskContribution> contributions
) {
}


