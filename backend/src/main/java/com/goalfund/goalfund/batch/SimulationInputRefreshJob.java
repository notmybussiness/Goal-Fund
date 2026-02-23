package com.goalfund.goalfund.batch;

import com.goalfund.goalfund.domain.event.SimulationDataRefreshed;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class SimulationInputRefreshJob {

    public BatchRunResult run() {
        LocalDateTime startedAt = LocalDateTime.now();
        SimulationDataRefreshed refreshed = new SimulationDataRefreshed(
                "simulation_input_v1",
                LocalDateTime.now()
        );
        return new BatchRunResult(
                "SimulationInputRefreshJob",
                "SUCCESS",
                startedAt,
                refreshed.refreshedAt(),
                "Simulation input data refreshed"
        );
    }
}


