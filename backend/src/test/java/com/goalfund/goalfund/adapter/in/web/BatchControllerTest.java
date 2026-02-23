package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.batch.BatchRunResult;
import com.goalfund.goalfund.batch.PriceHistoryIngestionJob;
import com.goalfund.goalfund.batch.RiskFeatureMaterializationJob;
import com.goalfund.goalfund.batch.SimulationInputRefreshJob;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class BatchControllerTest {

    @Test
    void runPriceHistoryIngestion_returnsJobResult() {
        PriceHistoryIngestionJob priceHistoryIngestionJob = mock(PriceHistoryIngestionJob.class);
        RiskFeatureMaterializationJob riskFeatureMaterializationJob = mock(RiskFeatureMaterializationJob.class);
        SimulationInputRefreshJob simulationInputRefreshJob = mock(SimulationInputRefreshJob.class);
        BatchController controller = new BatchController(
                priceHistoryIngestionJob,
                riskFeatureMaterializationJob,
                simulationInputRefreshJob
        );
        BatchRunResult result = new BatchRunResult(
                "PriceHistoryIngestionJob",
                "SUCCESS",
                LocalDateTime.now(),
                LocalDateTime.now(),
                "Done"
        );

        when(priceHistoryIngestionJob.run()).thenReturn(result);

        ResponseEntity<BatchRunResult> response = controller.runPriceHistoryIngestion();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertSame(result, response.getBody());
    }
}
