package com.goalfund.goalfund.application.service;

import com.goalfund.goalfund.application.port.in.SimulationUseCase;
import com.goalfund.goalfund.application.port.out.GoalRepositoryPort;
import com.goalfund.goalfund.application.port.out.PortfolioRepositoryPort;
import com.goalfund.goalfund.application.port.out.SimulationRepositoryPort;
import com.goalfund.goalfund.domain.model.Goal;
import com.goalfund.goalfund.domain.model.GoalStatus;
import com.goalfund.goalfund.domain.model.MonteCarloSummary;
import com.goalfund.goalfund.domain.model.Portfolio;
import com.goalfund.goalfund.domain.model.SimulationRun;
import com.goalfund.goalfund.domain.model.SimulationRunStatus;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class SimulationServiceTest {

    @Test
    void getRun_returnsEmptyWhenPortfolioDoesNotBelongToUser() {
        GoalRepositoryPort goalRepositoryPort = mock(GoalRepositoryPort.class);
        PortfolioRepositoryPort portfolioRepositoryPort = mock(PortfolioRepositoryPort.class);
        SimulationRepositoryPort simulationRepositoryPort = mock(SimulationRepositoryPort.class);
        SimulationService simulationService = new SimulationService(
                goalRepositoryPort,
                portfolioRepositoryPort,
                simulationRepositoryPort
        );

        UUID runId = UUID.randomUUID();
        SimulationRun run = new SimulationRun(
                runId,
                10L,
                20L,
                500,
                SimulationRunStatus.COMPLETED,
                LocalDateTime.now(),
                new MonteCarloSummary(
                        new BigDecimal("51.0000"),
                        new BigDecimal("9000000.0000"),
                        new BigDecimal("10000000.0000"),
                        new BigDecimal("11000000.0000")
                )
        );
        Goal goal = new Goal(
                10L,
                1L,
                "Retirement",
                new BigDecimal("100000000"),
                new BigDecimal("30000000"),
                new BigDecimal("1000000"),
                LocalDate.now().plusYears(5),
                GoalStatus.ACTIVE
        );
        Portfolio foreignPortfolio = new Portfolio(20L, 2L, "Foreign", "KRW", List.of());

        when(simulationRepositoryPort.findById(runId)).thenReturn(Optional.of(run));
        when(goalRepositoryPort.findById(10L)).thenReturn(Optional.of(goal));
        when(portfolioRepositoryPort.findById(20L)).thenReturn(Optional.of(foreignPortfolio));

        Optional<SimulationUseCase.SimulationRunResponse> response = simulationService.getRun(1L, runId);

        assertTrue(response.isEmpty());
    }
}
