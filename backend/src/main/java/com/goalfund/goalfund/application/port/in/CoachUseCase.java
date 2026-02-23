package com.goalfund.goalfund.application.port.in;

import java.util.List;

public interface CoachUseCase {

    CoachInsightResponse getInsights(Long userId, Long goalId, Long portfolioId);

    record CoachInsightResponse(
            Long goalId,
            Long portfolioId,
            String headline,
            List<String> cards
    ) {
    }
}


