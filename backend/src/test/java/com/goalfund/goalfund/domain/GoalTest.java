package com.goalfund.goalfund.domain;

import com.goalfund.goalfund.domain.model.Goal;
import com.goalfund.goalfund.domain.model.GoalStatus;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GoalTest {

    @Test
    void progressPercent_shouldReturnThirty_whenCurrentIsThirtyPercentOfTarget() {
        Goal goal = new Goal(
                1L,
                1L,
                "??吏?留덈젴",
                new BigDecimal("100000000"),
                new BigDecimal("30000000"),
                new BigDecimal("1000000"),
                LocalDate.now().plusYears(5),
                GoalStatus.ACTIVE
        );

        BigDecimal progress = goal.progressPercent();

        assertEquals(new BigDecimal("30.0000"), progress);
    }
}


