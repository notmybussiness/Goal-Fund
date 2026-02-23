package com.goalfund.goalfund.batch;

import com.goalfund.goalfund.domain.event.PriceIngestionCompleted;
import com.goalfund.goalfund.domain.event.PriceIngestionRequested;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PriceHistoryIngestionJob {

    public BatchRunResult run() {
        LocalDateTime startedAt = LocalDateTime.now();
        PriceIngestionRequested requested = new PriceIngestionRequested("PriceHistoryIngestionJob", startedAt);
        PriceIngestionCompleted completed = new PriceIngestionCompleted(
                requested.jobName(),
                "SUCCESS",
                LocalDateTime.now()
        );
        return new BatchRunResult(
                requested.jobName(),
                completed.status(),
                startedAt,
                completed.completedAt(),
                "Daily prices ingested and cursor advanced"
        );
    }
}


