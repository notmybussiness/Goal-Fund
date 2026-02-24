package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.CoachUseCase;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CoachControllerTest {

    @Test
    void getInsights_usesDefaultUserIdWhenHeaderMissing() {
        CoachUseCase coachUseCase = mock(CoachUseCase.class);
        CoachController controller = new CoachController(coachUseCase);
        CoachUseCase.CoachInsightResponse insightResponse = new CoachUseCase.CoachInsightResponse(
                10L,
                20L,
                "Balanced progress message",
                List.of("Card one", "Card two", "Card three")
        );

        when(coachUseCase.getInsights(1L, 10L, 20L)).thenReturn(insightResponse);

        ResponseEntity<CoachUseCase.CoachInsightResponse> response = controller.getInsights(null, 10L, 20L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertSame(insightResponse, response.getBody());
        verify(coachUseCase).getInsights(1L, 10L, 20L);
    }

    @Test
    void getInsights_returnsNotFoundWhenGoalMissing() {
        CoachUseCase coachUseCase = mock(CoachUseCase.class);
        CoachController controller = new CoachController(coachUseCase);

        when(coachUseCase.getInsights(1L, 10L, 20L)).thenThrow(new NoSuchElementException("Goal not found"));

        ResponseEntity<CoachUseCase.CoachInsightResponse> response = controller.getInsights(null, 10L, 20L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }
}
