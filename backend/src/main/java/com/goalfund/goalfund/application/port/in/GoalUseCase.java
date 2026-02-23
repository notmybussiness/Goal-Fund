package com.goalfund.goalfund.application.port.in;

import com.goalfund.goalfund.domain.model.GoalStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface GoalUseCase {

    GoalResponse createGoal(Long userId, GoalCommand command);

    List<GoalResponse> getGoals(Long userId);

    Optional<GoalResponse> getGoal(Long userId, Long goalId);

    Optional<GoalResponse> updateGoal(Long userId, Long goalId, GoalPatchCommand command);

    boolean deleteGoal(Long userId, Long goalId);

    record GoalCommand(
            String name,
            BigDecimal targetAmount,
            BigDecimal currentAmount,
            BigDecimal monthlyContribution,
            LocalDate targetDate
    ) {
    }

    record GoalPatchCommand(
            BigDecimal currentAmount,
            BigDecimal monthlyContribution,
            GoalStatus status
    ) {
    }

    record GoalResponse(
            Long id,
            String name,
            BigDecimal targetAmount,
            BigDecimal currentAmount,
            BigDecimal monthlyContribution,
            LocalDate targetDate,
            GoalStatus status,
            BigDecimal progressPercent
    ) {
    }
}


