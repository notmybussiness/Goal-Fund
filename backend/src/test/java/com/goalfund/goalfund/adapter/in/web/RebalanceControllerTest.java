package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.RebalanceUseCase;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
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

class RebalanceControllerTest {

    @Test
    void createProposal_usesDefaultUserIdWhenHeaderMissing() {
        RebalanceUseCase rebalanceUseCase = mock(RebalanceUseCase.class);
        RebalanceController controller = new RebalanceController(rebalanceUseCase);
        RebalanceUseCase.RebalanceProposalResponse proposalResponse = new RebalanceUseCase.RebalanceProposalResponse(
                UUID.randomUUID(),
                2L,
                "Equal weight rebalance proposal generated",
                LocalDateTime.now(),
                List.of(new RebalanceUseCase.RebalanceActionItem("AAA", "HOLD", BigDecimal.ZERO))
        );

        when(rebalanceUseCase.createProposal(any(Long.class), any(RebalanceUseCase.RebalanceProposalRequest.class)))
                .thenReturn(proposalResponse);

        ResponseEntity<RebalanceUseCase.RebalanceProposalResponse> response = controller.createProposal(
                null,
                new RebalanceController.CreateProposalRequest(2L, new BigDecimal("1.0000"))
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertSame(proposalResponse, response.getBody());
        verify(rebalanceUseCase).createProposal(
                1L,
                new RebalanceUseCase.RebalanceProposalRequest(2L, new BigDecimal("1.0000"))
        );
    }

    @Test
    void createProposal_returnsNotFoundWhenPortfolioMissing() {
        RebalanceUseCase rebalanceUseCase = mock(RebalanceUseCase.class);
        RebalanceController controller = new RebalanceController(rebalanceUseCase);

        when(rebalanceUseCase.createProposal(any(Long.class), any(RebalanceUseCase.RebalanceProposalRequest.class)))
                .thenThrow(new NoSuchElementException("Portfolio not found"));

        ResponseEntity<RebalanceUseCase.RebalanceProposalResponse> response = controller.createProposal(
                null,
                new RebalanceController.CreateProposalRequest(2L, new BigDecimal("1.0000"))
        );

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void getProposal_returnsNotFoundWhenProposalMissing() {
        RebalanceUseCase rebalanceUseCase = mock(RebalanceUseCase.class);
        RebalanceController controller = new RebalanceController(rebalanceUseCase);
        UUID proposalId = UUID.randomUUID();

        when(rebalanceUseCase.getProposal(1L, proposalId)).thenReturn(Optional.empty());

        ResponseEntity<RebalanceUseCase.RebalanceProposalResponse> response = controller.getProposal(null, proposalId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }
}
