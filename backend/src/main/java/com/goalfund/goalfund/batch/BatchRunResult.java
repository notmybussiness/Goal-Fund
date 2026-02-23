package com.goalfund.goalfund.batch;

import java.time.LocalDateTime;

public record BatchRunResult(
        String jobName,
        String status,
        LocalDateTime startedAt,
        LocalDateTime finishedAt,
        String message
) {
}


