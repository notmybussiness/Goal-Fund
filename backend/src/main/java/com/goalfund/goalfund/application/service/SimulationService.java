package com.goalfund.goalfund.application.service;

import com.goalfund.goalfund.application.port.in.SimulationUseCase;
import com.goalfund.goalfund.application.port.out.GoalRepositoryPort;
import com.goalfund.goalfund.application.port.out.PortfolioRepositoryPort;
import com.goalfund.goalfund.application.port.out.SimulationRepositoryPort;
import com.goalfund.goalfund.domain.model.Goal;
import com.goalfund.goalfund.domain.model.MonteCarloSimulationEngine;
import com.goalfund.goalfund.domain.model.MonteCarloSummary;
import com.goalfund.goalfund.domain.model.Portfolio;
import com.goalfund.goalfund.domain.model.SimulationRun;
import com.goalfund.goalfund.domain.model.SimulationRunStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class SimulationService implements SimulationUseCase {

    private final GoalRepositoryPort goalRepositoryPort;
    private final PortfolioRepositoryPort portfolioRepositoryPort;
    private final SimulationRepositoryPort simulationRepositoryPort;

    public SimulationService(
            GoalRepositoryPort goalRepositoryPort,
            PortfolioRepositoryPort portfolioRepositoryPort,
            SimulationRepositoryPort simulationRepositoryPort
    ) {
        this.goalRepositoryPort = goalRepositoryPort;
        this.portfolioRepositoryPort = portfolioRepositoryPort;
        this.simulationRepositoryPort = simulationRepositoryPort;
    }

    @Override
    public SimulationRunResponse createRun(Long userId, SimulationRunRequest request) {
        Goal goal = goalRepositoryPort.findById(request.goalId())
                .filter(g -> g.userId().equals(userId))
                .orElseThrow(() -> new NoSuchElementException("Goal not found"));
        Portfolio portfolio = portfolioRepositoryPort.findById(request.portfolioId())
                .filter(p -> p.userId().equals(userId))
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));

        MonteCarloSummary summary = MonteCarloSimulationEngine.simulate(
                goal.currentAmount(),
                goal.targetAmount(),
                goal.monthlyContribution(),
                request.months(),
                request.scenarioCount(),
                42L + portfolio.id()
        );

        SimulationRun run = new SimulationRun(
                UUID.randomUUID(),
                request.goalId(),
                request.portfolioId(),
                request.scenarioCount(),
                SimulationRunStatus.COMPLETED,
                LocalDateTime.now(),
                summary
        );
        SimulationRun saved = simulationRepositoryPort.save(run);
        return toResponse(saved);
    }

    @Override
    public Optional<SimulationRunResponse> getRun(Long userId, UUID runId) {
        return simulationRepositoryPort.findById(runId)
                .filter(run -> isOwnedByUser(run, userId))
                .map(this::toResponse);
    }

    private boolean isOwnedByUser(SimulationRun run, Long userId) {
        boolean goalOwnedByUser = goalRepositoryPort.findById(run.goalId())
                .map(goal -> goal.userId().equals(userId))
                .orElse(false);

        if (!goalOwnedByUser) {
            return false;
        }

        return portfolioRepositoryPort.findById(run.portfolioId())
                .map(portfolio -> portfolio.userId().equals(userId))
                .orElse(false);
    }

    private SimulationRunResponse toResponse(SimulationRun run) {
        return new SimulationRunResponse(
                run.id(),
                run.goalId(),
                run.portfolioId(),
                run.scenarioCount(),
                run.status().name(),
                run.createdAt(),
                new SimulationSummaryResponse(
                        run.summary().successProbabilityPercent(),
                        run.summary().p10Outcome(),
                        run.summary().p50Outcome(),
                        run.summary().p90Outcome()
                )
        );
    }
}


