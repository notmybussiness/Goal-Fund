package com.goalfund.goalfund.batch;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class BatchScheduler {

    private final PriceHistoryIngestionJob priceHistoryIngestionJob;
    private final RiskFeatureMaterializationJob riskFeatureMaterializationJob;
    private final SimulationInputRefreshJob simulationInputRefreshJob;

    public BatchScheduler(
            PriceHistoryIngestionJob priceHistoryIngestionJob,
            RiskFeatureMaterializationJob riskFeatureMaterializationJob,
            SimulationInputRefreshJob simulationInputRefreshJob
    ) {
        this.priceHistoryIngestionJob = priceHistoryIngestionJob;
        this.riskFeatureMaterializationJob = riskFeatureMaterializationJob;
        this.simulationInputRefreshJob = simulationInputRefreshJob;
    }

    @Scheduled(cron = "${goalfund.batch.price-history.cron:0 5 0 * * *}", zone = "${goalfund.batch.zone:Asia/Seoul}")
    public void runPriceHistoryIngestion() {
        priceHistoryIngestionJob.run();
    }

    @Scheduled(cron = "${goalfund.batch.risk-feature.cron:0 15 0 * * *}", zone = "${goalfund.batch.zone:Asia/Seoul}")
    public void runRiskFeatureMaterialization() {
        riskFeatureMaterializationJob.run();
    }

    @Scheduled(cron = "${goalfund.batch.simulation-input.cron:0 25 0 * * *}", zone = "${goalfund.batch.zone:Asia/Seoul}")
    public void runSimulationInputRefresh() {
        simulationInputRefreshJob.run();
    }
}
