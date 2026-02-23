package com.goalfund.goalfund.application.service;

import com.goalfund.goalfund.application.port.in.GoalUseCase;
import com.goalfund.goalfund.application.port.out.GoalRepositoryPort;
import com.goalfund.goalfund.domain.model.Goal;
import com.goalfund.goalfund.domain.model.GoalStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoalService implements GoalUseCase {

    private final GoalRepositoryPort goalRepositoryPort;

    public GoalService(GoalRepositoryPort goalRepositoryPort) {
        this.goalRepositoryPort = goalRepositoryPort;
    }

    @Override
    public GoalResponse createGoal(Long userId, GoalCommand command) {
        Goal saved = goalRepositoryPort.save(new Goal(
                null,
                userId,
                command.name(),
                command.targetAmount(),
                command.currentAmount(),
                command.monthlyContribution(),
                command.targetDate(),
                GoalStatus.ACTIVE
        ));
        return toResponse(saved);
    }

    @Override
    public List<GoalResponse> getGoals(Long userId) {
        return goalRepositoryPort.findByUserId(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public Optional<GoalResponse> getGoal(Long userId, Long goalId) {
        return goalRepositoryPort.findById(goalId)
                .filter(goal -> goal.userId().equals(userId))
                .map(this::toResponse);
    }

    @Override
    public Optional<GoalResponse> updateGoal(Long userId, Long goalId, GoalPatchCommand command) {
        Optional<Goal> maybeGoal = goalRepositoryPort.findById(goalId)
                .filter(goal -> goal.userId().equals(userId));

        if (maybeGoal.isEmpty()) {
            return Optional.empty();
        }

        Goal existing = maybeGoal.get();
        Goal updated = new Goal(
                existing.id(),
                existing.userId(),
                existing.name(),
                existing.targetAmount(),
                command.currentAmount() == null ? existing.currentAmount() : command.currentAmount(),
                command.monthlyContribution() == null ? existing.monthlyContribution() : command.monthlyContribution(),
                existing.targetDate(),
                command.status() == null ? existing.status() : command.status()
        );
        return Optional.of(toResponse(goalRepositoryPort.save(updated)));
    }

    @Override
    public boolean deleteGoal(Long userId, Long goalId) {
        boolean exists = goalRepositoryPort.findById(goalId)
                .filter(goal -> goal.userId().equals(userId))
                .isPresent();

        if (!exists) {
            return false;
        }

        goalRepositoryPort.deleteById(goalId);
        return true;
    }

    private GoalResponse toResponse(Goal goal) {
        return new GoalResponse(
                goal.id(),
                goal.name(),
                goal.targetAmount(),
                goal.currentAmount(),
                goal.monthlyContribution(),
                goal.targetDate(),
                goal.status(),
                goal.progressPercent()
        );
    }
}


