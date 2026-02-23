package com.goalfund.goalfund.domain.model;

import java.math.BigDecimal;

public record MonteCarloSummary(
        BigDecimal successProbabilityPercent,
        BigDecimal p10Outcome,
        BigDecimal p50Outcome,
        BigDecimal p90Outcome
) {
}


