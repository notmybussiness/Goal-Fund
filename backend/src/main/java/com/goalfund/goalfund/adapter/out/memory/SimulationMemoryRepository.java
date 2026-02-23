package com.goalfund.goalfund.adapter.out.memory;

import com.goalfund.goalfund.application.port.out.SimulationRepositoryPort;
import com.goalfund.goalfund.domain.model.SimulationRun;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SimulationMemoryRepository implements SimulationRepositoryPort {

    private final ConcurrentHashMap<UUID, SimulationRun> runs = new ConcurrentHashMap<>();

    @Override
    public SimulationRun save(SimulationRun run) {
        runs.put(run.id(), run);
        return run;
    }

    @Override
    public Optional<SimulationRun> findById(UUID runId) {
        return Optional.ofNullable(runs.get(runId));
    }
}


