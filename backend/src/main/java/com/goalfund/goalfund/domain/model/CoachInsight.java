package com.goalfund.goalfund.domain.model;

import java.util.List;

public record CoachInsight(
        Long goalId,
        Long portfolioId,
        String headline,
        List<String> cards
) {
}


