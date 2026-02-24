package com.goalfund.goalfund.application.service;

import com.goalfund.goalfund.application.port.in.CoachUseCase;
import com.goalfund.goalfund.application.port.in.GoalUseCase;
import com.goalfund.goalfund.application.port.in.RiskUseCase;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CoachService implements CoachUseCase {

    private final GoalUseCase goalUseCase;
    private final RiskUseCase riskUseCase;

    public CoachService(GoalUseCase goalUseCase, RiskUseCase riskUseCase) {
        this.goalUseCase = goalUseCase;
        this.riskUseCase = riskUseCase;
    }

    @Override
    public CoachInsightResponse getInsights(Long userId, Long goalId, Long portfolioId) {
        GoalUseCase.GoalResponse goal = goalUseCase.getGoal(userId, goalId)
                .orElseThrow(() -> new NoSuchElementException("Goal not found"));
        RiskUseCase.RiskSnapshotResponse risk = riskUseCase.getSnapshot(userId, portfolioId);

        List<String> cards = new ArrayList<>();
        cards.add("Goal progress is " + goal.progressPercent() + "%.");
        cards.add("Expected maximum drawdown is " + risk.expectedMaxDrawdown() + "%.");
        if (risk.expectedMaxDrawdown().compareTo(new BigDecimal("30.0000")) > 0) {
            cards.add("Risk concentration is high. Consider reducing single-asset exposure.");
        } else {
            cards.add("Risk concentration is manageable. Keep monitoring allocations.");
        }

        return new CoachInsightResponse(
                goalId,
                portfolioId,
                "Improve goal probability by balancing contributions and concentrated risk.",
                cards
        );
    }
}


