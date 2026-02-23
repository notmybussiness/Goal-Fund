package com.goalfund.goalfund.application.port.in;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface SimulationUseCase {

    SimulationRunResponse createRun(Long userId, SimulationRunRequest request);

    Optional<SimulationRunResponse> getRun(Long userId, UUID runId);

    record SimulationRunRequest(
            Long goalId,
            Long portfolioId,
            int scenarioCount,
            int months
    ) {
    }

    record SimulationSummaryResponse(
            BigDecimal successProbabilityPercent,
            BigDecimal p10Outcome,
            BigDecimal p50Outcome,
            BigDecimal p90Outcome
    ) {
    }

    record SimulationRunResponse(
            UUID runId,
            Long goalId,
            Long portfolioId,
            int scenarioCount,
            String status,
            LocalDateTime createdAt,
            SimulationSummaryResponse summary
    ) {
    }
}


