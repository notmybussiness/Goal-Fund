package com.goalfund.goalfund.domain.model;

import java.math.BigDecimal;

public record RebalanceAction(
        String symbol,
        RebalanceActionType actionType,
        BigDecimal amount
) {
}


