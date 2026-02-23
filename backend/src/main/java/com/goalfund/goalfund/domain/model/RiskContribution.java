package com.goalfund.goalfund.domain.model;

import java.math.BigDecimal;

public record RiskContribution(
        String symbol,
        BigDecimal riskPercent,
        BigDecimal factorExposureScore
) {
}


