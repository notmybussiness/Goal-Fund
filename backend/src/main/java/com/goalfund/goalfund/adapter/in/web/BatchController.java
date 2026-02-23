package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.batch.BatchRunResult;
import com.goalfund.goalfund.batch.PriceHistoryIngestionJob;
import com.goalfund.goalfund.batch.RiskFeatureMaterializationJob;
import com.goalfund.goalfund.batch.SimulationInputRefreshJob;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/batch")
public class BatchController {

    private final PriceHistoryIngestionJob priceHistoryIngestionJob;
    private final RiskFeatureMaterializationJob riskFeatureMaterializationJob;
    private final SimulationInputRefreshJob simulationInputRefreshJob;

    public BatchController(
            PriceHistoryIngestionJob priceHistoryIngestionJob,
            RiskFeatureMaterializationJob riskFeatureMaterializationJob,
            SimulationInputRefreshJob simulationInputRefreshJob
    ) {
        this.priceHistoryIngestionJob = priceHistoryIngestionJob;
        this.riskFeatureMaterializationJob = riskFeatureMaterializationJob;
        this.simulationInputRefreshJob = simulationInputRefreshJob;
    }

    @PostMapping("/price-history-ingestion")
    public ResponseEntity<BatchRunResult> runPriceHistoryIngestion() {
        return ResponseEntity.ok(priceHistoryIngestionJob.run());
    }

    @PostMapping("/risk-feature-materialization")
    public ResponseEntity<BatchRunResult> runRiskFeatureMaterialization() {
        return ResponseEntity.ok(riskFeatureMaterializationJob.run());
    }

    @PostMapping("/simulation-input-refresh")
    public ResponseEntity<BatchRunResult> runSimulationInputRefresh() {
        return ResponseEntity.ok(simulationInputRefreshJob.run());
    }
}


