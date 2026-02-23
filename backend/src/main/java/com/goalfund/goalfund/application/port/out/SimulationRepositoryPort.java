package com.goalfund.goalfund.application.port.out;

import com.goalfund.goalfund.domain.model.SimulationRun;

import java.util.Optional;
import java.util.UUID;

public interface SimulationRepositoryPort {

    SimulationRun save(SimulationRun run);

    Optional<SimulationRun> findById(UUID runId);
}


