package com.goalfund.goalfund.application.port.out;

import com.goalfund.goalfund.domain.model.Portfolio;

import java.util.Optional;

public interface PortfolioRepositoryPort {

    Portfolio save(Portfolio portfolio);

    Optional<Portfolio> findById(Long id);
}


