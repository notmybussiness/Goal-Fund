package com.goalfund.goalfund.application.service;

import com.goalfund.goalfund.adapter.out.memory.PortfolioMemoryRepository;
import com.goalfund.goalfund.application.port.in.PortfolioUseCase;
import com.goalfund.goalfund.domain.model.AssetType;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PortfolioServiceTest {

    private final PortfolioMemoryRepository repository = new PortfolioMemoryRepository();
    private final PortfolioService portfolioService = new PortfolioService(repository);

    @Test
    void addHolding_returnsEmpty_whenPortfolioBelongsToAnotherUser() {
        PortfolioUseCase.PortfolioResponse portfolio = portfolioService.createPortfolio(
                1L,
                new PortfolioUseCase.CreatePortfolioCommand("Main", "KRW")
        );

        Optional<PortfolioUseCase.PortfolioResponse> response = portfolioService.addHolding(
                2L,
                portfolio.id(),
                new PortfolioUseCase.AddHoldingCommand(
                        "SPY",
                        AssetType.STOCK,
                        new BigDecimal("1.00000000"),
                        new BigDecimal("1000.00")
                )
        );

        assertTrue(response.isEmpty());
    }

    @Test
    void addHolding_recalculatesWeightPercent_whenSecondHoldingIsAdded() {
        PortfolioUseCase.PortfolioResponse portfolio = portfolioService.createPortfolio(
                1L,
                new PortfolioUseCase.CreatePortfolioCommand("Main", "KRW")
        );

        portfolioService.addHolding(
                1L,
                portfolio.id(),
                new PortfolioUseCase.AddHoldingCommand(
                        "SPY",
                        AssetType.STOCK,
                        new BigDecimal("1.00000000"),
                        new BigDecimal("600.00")
                )
        );

        Optional<PortfolioUseCase.PortfolioResponse> updated = portfolioService.addHolding(
                1L,
                portfolio.id(),
                new PortfolioUseCase.AddHoldingCommand(
                        "BTC",
                        AssetType.CRYPTO,
                        new BigDecimal("0.01000000"),
                        new BigDecimal("400.00")
                )
        );

        assertTrue(updated.isPresent());
        assertEquals(new BigDecimal("60.0000"), updated.get().holdings().get(0).weightPercent());
        assertEquals(new BigDecimal("40.0000"), updated.get().holdings().get(1).weightPercent());
    }
}
