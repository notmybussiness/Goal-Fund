package com.goalfund.goalfund.application.service;

import com.goalfund.goalfund.adapter.out.memory.GoalMemoryRepository;
import com.goalfund.goalfund.application.port.in.GoalUseCase;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GoalServiceTest {

    private final GoalMemoryRepository repository = new GoalMemoryRepository();
    private final GoalService goalService = new GoalService(repository);

    @Test
    void deleteGoal_returnsTrueAndRemovesGoal_whenGoalBelongsToUser() {
        GoalUseCase.GoalResponse created = goalService.createGoal(
                1L,
                new GoalUseCase.GoalCommand(
                        "Retirement",
                        new BigDecimal("100000000"),
                        new BigDecimal("30000000"),
                        new BigDecimal("1000000"),
                        LocalDate.now().plusYears(10)
                )
        );

        boolean deleted = goalService.deleteGoal(1L, created.id());

        assertTrue(deleted);
        assertTrue(goalService.getGoal(1L, created.id()).isEmpty());
    }

    @Test
    void deleteGoal_returnsFalse_whenGoalBelongsToAnotherUser() {
        GoalUseCase.GoalResponse created = goalService.createGoal(
                1L,
                new GoalUseCase.GoalCommand(
                        "House",
                        new BigDecimal("500000000"),
                        new BigDecimal("50000000"),
                        new BigDecimal("2000000"),
                        LocalDate.now().plusYears(7)
                )
        );

        boolean deleted = goalService.deleteGoal(2L, created.id());

        assertFalse(deleted);
        assertTrue(goalService.getGoal(1L, created.id()).isPresent());
    }
}
