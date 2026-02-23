package com.goalfund.goalfund.domain.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record RebalanceProposal(
        UUID id,
        Long portfolioId,
        String summary,
        LocalDateTime createdAt,
        List<RebalanceAction> actions
) {
}


