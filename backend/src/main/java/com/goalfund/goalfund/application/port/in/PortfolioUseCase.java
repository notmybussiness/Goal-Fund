package com.goalfund.goalfund.application.port.in;

import com.goalfund.goalfund.domain.model.AssetType;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface PortfolioUseCase {

    PortfolioResponse createPortfolio(Long userId, CreatePortfolioCommand command);

    Optional<PortfolioResponse> addHolding(Long userId, Long portfolioId, AddHoldingCommand command);

    record CreatePortfolioCommand(
            String name,
            String baseCurrency
    ) {
    }

    record AddHoldingCommand(
            String symbol,
            AssetType assetType,
            BigDecimal quantity,
            BigDecimal marketValue
    ) {
    }

    record PortfolioHoldingResponse(
            Long id,
            String symbol,
            AssetType assetType,
            BigDecimal quantity,
            BigDecimal marketValue,
            BigDecimal weightPercent
    ) {
    }

    record PortfolioResponse(
            Long id,
            String name,
            String baseCurrency,
            BigDecimal totalMarketValue,
            List<PortfolioHoldingResponse> holdings
    ) {
    }
}


