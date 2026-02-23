package com.goalfund.goalfund.domain.event;

import java.time.LocalDateTime;

public record PriceIngestionCompleted(
        String jobName,
        String status,
        LocalDateTime completedAt
) {
}


