package com.goalfund.goalfund.adapter.out.memory;

import com.goalfund.goalfund.application.port.out.PortfolioRepositoryPort;
import com.goalfund.goalfund.domain.model.Portfolio;
import com.goalfund.goalfund.domain.model.PortfolioHolding;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class PortfolioMemoryRepository implements PortfolioRepositoryPort {

    private final ConcurrentHashMap<Long, Portfolio> portfolios = new ConcurrentHashMap<>();
    private final AtomicLong portfolioSequence = new AtomicLong(1L);
    private final AtomicLong holdingSequence = new AtomicLong(1L);

    @Override
    public Portfolio save(Portfolio portfolio) {
        Long id = portfolio.id() == null ? portfolioSequence.getAndIncrement() : portfolio.id();
        List<PortfolioHolding> clonedHoldings = new ArrayList<>();
        for (PortfolioHolding h : portfolio.holdings()) {
            Long hid = h.id() == null ? holdingSequence.getAndIncrement() : h.id();
            clonedHoldings.add(new PortfolioHolding(
                    hid,
                    h.symbol(),
                    h.assetType(),
                    h.quantity(),
                    h.marketValue(),
                    h.weightPercent()
            ));
        }
        Portfolio persisted = new Portfolio(id, portfolio.userId(), portfolio.name(), portfolio.baseCurrency(), clonedHoldings);
        portfolios.put(id, persisted);
        return persisted;
    }

    @Override
    public Optional<Portfolio> findById(Long id) {
        return Optional.ofNullable(portfolios.get(id));
    }
}


