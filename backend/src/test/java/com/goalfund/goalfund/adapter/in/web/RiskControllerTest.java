package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.RiskUseCase;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class RiskControllerTest {

    @Test
    void getSnapshot_usesDefaultUserIdWhenHeaderMissing() {
        RiskUseCase riskUseCase = mock(RiskUseCase.class);
        RiskController controller = new RiskController(riskUseCase);
        RiskUseCase.RiskSnapshotResponse snapshotResponse = new RiskUseCase.RiskSnapshotResponse(
                9L,
                LocalDateTime.now(),
                new BigDecimal("21.0000"),
                new BigDecimal("37.8000"),
                List.of()
        );

        when(riskUseCase.getSnapshot(1L, 9L)).thenReturn(snapshotResponse);

        ResponseEntity<RiskUseCase.RiskSnapshotResponse> response = controller.getSnapshot(null, 9L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertSame(snapshotResponse, response.getBody());
        verify(riskUseCase).getSnapshot(1L, 9L);
    }

    @Test
    void getSnapshot_returnsNotFoundWhenPortfolioMissing() {
        RiskUseCase riskUseCase = mock(RiskUseCase.class);
        RiskController controller = new RiskController(riskUseCase);

        when(riskUseCase.getSnapshot(1L, 9L)).thenThrow(new NoSuchElementException("Portfolio not found"));

        ResponseEntity<RiskUseCase.RiskSnapshotResponse> response = controller.getSnapshot(null, 9L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }
}
