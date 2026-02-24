package com.goalfund.goalfund.batch;

import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class BatchSchedulerTest {

    @Test
    void runPriceHistoryIngestionDelegatesToJob() {
        PriceHistoryIngestionJob priceHistoryIngestionJob = mock(PriceHistoryIngestionJob.class);
        RiskFeatureMaterializationJob riskFeatureMaterializationJob = mock(RiskFeatureMaterializationJob.class);
        SimulationInputRefreshJob simulationInputRefreshJob = mock(SimulationInputRefreshJob.class);

        BatchScheduler scheduler = new BatchScheduler(
                priceHistoryIngestionJob,
                riskFeatureMaterializationJob,
                simulationInputRefreshJob
        );

        scheduler.runPriceHistoryIngestion();

        verify(priceHistoryIngestionJob).run();
    }

    @Test
    void runRiskFeatureMaterializationDelegatesToJob() {
        PriceHistoryIngestionJob priceHistoryIngestionJob = mock(PriceHistoryIngestionJob.class);
        RiskFeatureMaterializationJob riskFeatureMaterializationJob = mock(RiskFeatureMaterializationJob.class);
        SimulationInputRefreshJob simulationInputRefreshJob = mock(SimulationInputRefreshJob.class);

        BatchScheduler scheduler = new BatchScheduler(
                priceHistoryIngestionJob,
                riskFeatureMaterializationJob,
                simulationInputRefreshJob
        );

        scheduler.runRiskFeatureMaterialization();

        verify(riskFeatureMaterializationJob).run();
    }

    @Test
    void runSimulationInputRefreshDelegatesToJob() {
        PriceHistoryIngestionJob priceHistoryIngestionJob = mock(PriceHistoryIngestionJob.class);
        RiskFeatureMaterializationJob riskFeatureMaterializationJob = mock(RiskFeatureMaterializationJob.class);
        SimulationInputRefreshJob simulationInputRefreshJob = mock(SimulationInputRefreshJob.class);

        BatchScheduler scheduler = new BatchScheduler(
                priceHistoryIngestionJob,
                riskFeatureMaterializationJob,
                simulationInputRefreshJob
        );

        scheduler.runSimulationInputRefresh();

        verify(simulationInputRefreshJob).run();
    }
}
