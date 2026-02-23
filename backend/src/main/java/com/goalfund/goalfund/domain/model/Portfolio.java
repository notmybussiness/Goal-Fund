package com.goalfund.goalfund.domain.model;

import java.math.BigDecimal;
import java.util.List;

public record Portfolio(
        Long id,
        Long userId,
        String name,
        String baseCurrency,
        List<PortfolioHolding> holdings
) {
    public BigDecimal totalMarketValue() {
        return holdings.stream()
                .map(PortfolioHolding::marketValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}


