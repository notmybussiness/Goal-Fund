package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.SimulationUseCase;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/simulation/runs")
public class SimulationController {

    private final SimulationUseCase simulationUseCase;

    public SimulationController(SimulationUseCase simulationUseCase) {
        this.simulationUseCase = simulationUseCase;
    }

    @PostMapping
    public ResponseEntity<SimulationUseCase.SimulationRunResponse> createRun(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId,
            @Valid @RequestBody CreateSimulationRequest request
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        try {
            return ResponseEntity.ok(simulationUseCase.createRun(
                    effectiveUserId,
                    new SimulationUseCase.SimulationRunRequest(
                            request.goalId(),
                            request.portfolioId(),
                            request.scenarioCount(),
                            request.months()
                    )
            ));
        } catch (NoSuchElementException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{runId}")
    public ResponseEntity<SimulationUseCase.SimulationRunResponse> getRun(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId,
            @PathVariable UUID runId
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        return simulationUseCase.getRun(effectiveUserId, runId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public record CreateSimulationRequest(
            @NotNull Long goalId,
            @NotNull Long portfolioId,
            @Min(100) int scenarioCount,
            @Min(1) int months
    ) {
    }
}


