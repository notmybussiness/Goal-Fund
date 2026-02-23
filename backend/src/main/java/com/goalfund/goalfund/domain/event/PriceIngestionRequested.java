package com.goalfund.goalfund.domain.event;

import java.time.LocalDateTime;

public record PriceIngestionRequested(
        String jobName,
        LocalDateTime requestedAt
) {
}


