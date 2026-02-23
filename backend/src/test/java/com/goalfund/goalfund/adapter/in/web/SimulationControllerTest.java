package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.SimulationUseCase;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class SimulationControllerTest {

    @Test
    void createRun_usesDefaultUserIdWhenHeaderMissing() {
        SimulationUseCase simulationUseCase = mock(SimulationUseCase.class);
        SimulationController controller = new SimulationController(simulationUseCase);
        SimulationUseCase.SimulationRunResponse runResponse = new SimulationUseCase.SimulationRunResponse(
                UUID.randomUUID(),
                1L,
                2L,
                500,
                "COMPLETED",
                LocalDateTime.now(),
                new SimulationUseCase.SimulationSummaryResponse(
                        new BigDecimal("50.0000"),
                        new BigDecimal("9000000.0000"),
                        new BigDecimal("10000000.0000"),
                        new BigDecimal("11000000.0000")
                )
        );

        when(simulationUseCase.createRun(any(Long.class), any(SimulationUseCase.SimulationRunRequest.class)))
                .thenReturn(runResponse);

        ResponseEntity<SimulationUseCase.SimulationRunResponse> response = controller.createRun(
                null,
                new SimulationController.CreateSimulationRequest(1L, 2L, 500, 12)
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertSame(runResponse, response.getBody());
        verify(simulationUseCase).createRun(
                1L,
                new SimulationUseCase.SimulationRunRequest(1L, 2L, 500, 12)
        );
    }

    @Test
    void createRun_returnsNotFoundWhenGoalOrPortfolioMissing() {
        SimulationUseCase simulationUseCase = mock(SimulationUseCase.class);
        SimulationController controller = new SimulationController(simulationUseCase);

        when(simulationUseCase.createRun(any(Long.class), any(SimulationUseCase.SimulationRunRequest.class)))
                .thenThrow(new NoSuchElementException("Goal not found"));

        ResponseEntity<SimulationUseCase.SimulationRunResponse> response = controller.createRun(
                null,
                new SimulationController.CreateSimulationRequest(1L, 2L, 500, 12)
        );

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void getRun_returnsNotFoundWhenRunMissing() {
        SimulationUseCase simulationUseCase = mock(SimulationUseCase.class);
        SimulationController controller = new SimulationController(simulationUseCase);
        UUID runId = UUID.randomUUID();

        when(simulationUseCase.getRun(1L, runId)).thenReturn(Optional.empty());

        ResponseEntity<SimulationUseCase.SimulationRunResponse> response = controller.getRun(null, runId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }
}
