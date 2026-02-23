package com.goalfund.goalfund.application.service;

import com.goalfund.goalfund.application.port.in.CoachUseCase;
import com.goalfund.goalfund.application.port.in.GoalUseCase;
import com.goalfund.goalfund.application.port.in.RiskUseCase;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
                .orElseThrow(() -> new IllegalArgumentException("Goal not found"));
        RiskUseCase.RiskSnapshotResponse risk = riskUseCase.getSnapshot(userId, portfolioId);

        List<String> cards = new ArrayList<>();
        cards.add("?꾩옱 紐⑺몴 吏꾪뻾瑜좎? " + goal.progressPercent() + "% ?낅땲??");
        cards.add("?덉긽 理쒕? ?숉룺? " + risk.expectedMaxDrawdown() + "% ?낅땲??");
        cards.add("由ъ뒪?ш? 媛?????먯궛 鍮꾩쨷???곗꽑 ?먭??섏꽭??");

        return new CoachInsightResponse(
                goalId,
                portfolioId,
                "紐⑺몴 ?ъ꽦 ?뺣쪧???믪씠?ㅻ㈃ 由ъ뒪??吏묒쨷???꾪솕媛 ?곗꽑?낅땲??",
                cards
        );
    }
}


