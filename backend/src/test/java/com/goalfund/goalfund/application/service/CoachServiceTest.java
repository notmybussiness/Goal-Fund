package com.goalfund.goalfund.application.service;

import com.goalfund.goalfund.application.port.in.CoachUseCase;
import com.goalfund.goalfund.application.port.in.GoalUseCase;
import com.goalfund.goalfund.application.port.in.RiskUseCase;
import com.goalfund.goalfund.domain.model.GoalStatus;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CoachServiceTest {

    @Test
    void getInsights_returnsReadableCoachMessages() {
        GoalUseCase goalUseCase = mock(GoalUseCase.class);
        RiskUseCase riskUseCase = mock(RiskUseCase.class);
        CoachService coachService = new CoachService(goalUseCase, riskUseCase);

        GoalUseCase.GoalResponse goalResponse = new GoalUseCase.GoalResponse(
                100L,
                "Retirement",
                new BigDecimal("100000000"),
                new BigDecimal("30000000"),
                new BigDecimal("1000000"),
                LocalDate.now().plusYears(5),
                GoalStatus.ACTIVE,
                new BigDecimal("30.0000")
        );
        RiskUseCase.RiskSnapshotResponse riskResponse = new RiskUseCase.RiskSnapshotResponse(
                200L,
                LocalDateTime.now(),
                new BigDecimal("25.0000"),
                new BigDecimal("45.0000"),
                List.of()
        );

        when(goalUseCase.getGoal(1L, 100L)).thenReturn(Optional.of(goalResponse));
        when(riskUseCase.getSnapshot(1L, 200L)).thenReturn(riskResponse);

        CoachUseCase.CoachInsightResponse response = coachService.getInsights(1L, 100L, 200L);

        assertEquals(
                "Improve goal probability by balancing contributions and concentrated risk.",
                response.headline()
        );
        assertEquals(
                List.of(
                        "Goal progress is 30.0000%.",
                        "Expected maximum drawdown is 45.0000%.",
                        "Risk concentration is high. Consider reducing single-asset exposure."
                ),
                response.cards()
        );
    }
}
