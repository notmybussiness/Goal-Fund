package com.goalfund.goalfund.application.service;

import com.goalfund.goalfund.application.port.in.RiskUseCase;
import com.goalfund.goalfund.application.port.out.PortfolioRepositoryPort;
import com.goalfund.goalfund.domain.model.Portfolio;
import com.goalfund.goalfund.domain.model.RiskContribution;
import com.goalfund.goalfund.domain.model.RiskContributionNormalizer;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class RiskService implements RiskUseCase {

    private final PortfolioRepositoryPort portfolioRepositoryPort;

    public RiskService(PortfolioRepositoryPort portfolioRepositoryPort) {
        this.portfolioRepositoryPort = portfolioRepositoryPort;
    }

    @Override
    public RiskSnapshotResponse getSnapshot(Long userId, Long portfolioId) {
        Portfolio portfolio = portfolioRepositoryPort.findById(portfolioId)
                .filter(p -> p.userId().equals(userId))
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));

        List<RiskContribution> raw = portfolio.holdings().stream()
                .map(h -> new RiskContribution(
                        h.symbol(),
                        h.weightPercent(),
                        h.weightPercent().multiply(new BigDecimal("0.8")).setScale(4, RoundingMode.HALF_UP)
                ))
                .toList();

        List<RiskContribution> normalized = RiskContributionNormalizer.normalize(raw);
        BigDecimal volatility = normalized.stream()
                .map(c -> c.riskPercent().multiply(new BigDecimal("0.25")))
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(4, RoundingMode.HALF_UP);
        BigDecimal drawdown = volatility.multiply(new BigDecimal("1.8")).setScale(4, RoundingMode.HALF_UP);

        return new RiskSnapshotResponse(
                portfolioId,
                LocalDateTime.now(),
                volatility,
                drawdown,
                normalized.stream()
                        .map(c -> new RiskContributionItem(c.symbol(), c.riskPercent(), c.factorExposureScore()))
                        .toList()
        );
    }
}


