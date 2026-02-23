package com.goalfund.goalfund.domain.model;

import java.math.BigDecimal;

public record PortfolioHolding(
        Long id,
        String symbol,
        AssetType assetType,
        BigDecimal quantity,
        BigDecimal marketValue,
        BigDecimal weightPercent
) {
}


