package com.goalfund.goalfund.domain.model;

import java.time.LocalDateTime;
import java.util.UUID;

public record SimulationRun(
        UUID id,
        Long goalId,
        Long portfolioId,
        int scenarioCount,
        SimulationRunStatus status,
        LocalDateTime createdAt,
        MonteCarloSummary summary
) {
}


