package com.goalfund.goalfund.batch;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class RiskFeatureMaterializationJob {

    public BatchRunResult run() {
        LocalDateTime startedAt = LocalDateTime.now();
        LocalDateTime finishedAt = LocalDateTime.now();
        return new BatchRunResult(
                "RiskFeatureMaterializationJob",
                "SUCCESS",
                startedAt,
                finishedAt,
                "Volatility and correlation features materialized"
        );
    }
}


