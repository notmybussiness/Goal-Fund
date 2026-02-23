package com.goalfund.goalfund.application.service;

import com.goalfund.goalfund.application.port.in.PortfolioUseCase;
import com.goalfund.goalfund.application.port.out.PortfolioRepositoryPort;
import com.goalfund.goalfund.domain.model.Portfolio;
import com.goalfund.goalfund.domain.model.PortfolioHolding;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PortfolioService implements PortfolioUseCase {

    private final PortfolioRepositoryPort portfolioRepositoryPort;

    public PortfolioService(PortfolioRepositoryPort portfolioRepositoryPort) {
        this.portfolioRepositoryPort = portfolioRepositoryPort;
    }

    @Override
    public PortfolioResponse createPortfolio(Long userId, CreatePortfolioCommand command) {
        Portfolio saved = portfolioRepositoryPort.save(new Portfolio(
                null,
                userId,
                command.name(),
                command.baseCurrency() == null || command.baseCurrency().isBlank() ? "KRW" : command.baseCurrency(),
                new ArrayList<>()
        ));
        return toResponse(saved);
    }

    @Override
    public PortfolioResponse addHolding(Long userId, Long portfolioId, AddHoldingCommand command) {
        Portfolio portfolio = portfolioRepositoryPort.findById(portfolioId)
                .filter(p -> p.userId().equals(userId))
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));

        List<PortfolioHolding> updated = new ArrayList<>(portfolio.holdings());
        updated.add(new PortfolioHolding(
                null,
                command.symbol(),
                command.assetType(),
                command.quantity(),
                command.marketValue(),
                BigDecimal.ZERO
        ));

        BigDecimal total = updated.stream()
                .map(PortfolioHolding::marketValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<PortfolioHolding> weighted = new ArrayList<>();
        for (PortfolioHolding h : updated) {
            BigDecimal weight = total.compareTo(BigDecimal.ZERO) > 0
                    ? h.marketValue().multiply(new BigDecimal("100")).divide(total, 4, RoundingMode.HALF_UP)
                    : BigDecimal.ZERO;
            weighted.add(new PortfolioHolding(
                    h.id(),
                    h.symbol(),
                    h.assetType(),
                    h.quantity(),
                    h.marketValue(),
                    weight
            ));
        }

        Portfolio persisted = portfolioRepositoryPort.save(new Portfolio(
                portfolio.id(),
                portfolio.userId(),
                portfolio.name(),
                portfolio.baseCurrency(),
                weighted
        ));

        return toResponse(persisted);
    }

    private PortfolioResponse toResponse(Portfolio p) {
        return new PortfolioResponse(
                p.id(),
                p.name(),
                p.baseCurrency(),
                p.totalMarketValue(),
                p.holdings().stream()
                        .map(h -> new PortfolioHoldingResponse(
                                h.id(),
                                h.symbol(),
                                h.assetType(),
                                h.quantity(),
                                h.marketValue(),
                                h.weightPercent()
                        ))
                        .toList()
        );
    }
}


