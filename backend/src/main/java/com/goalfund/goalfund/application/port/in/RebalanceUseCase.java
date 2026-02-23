package com.goalfund.goalfund.application.port.in;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RebalanceUseCase {

    RebalanceProposalResponse createProposal(Long userId, RebalanceProposalRequest request);

    Optional<RebalanceProposalResponse> getProposal(Long userId, UUID proposalId);

    record RebalanceProposalRequest(
            Long portfolioId,
            BigDecimal thresholdPercent
    ) {
    }

    record RebalanceActionItem(
            String symbol,
            String actionType,
            BigDecimal amount
    ) {
    }

    record RebalanceProposalResponse(
            UUID proposalId,
            Long portfolioId,
            String summary,
            LocalDateTime createdAt,
            List<RebalanceActionItem> actions
    ) {
    }
}


