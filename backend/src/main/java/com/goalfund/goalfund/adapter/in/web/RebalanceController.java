package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.RebalanceUseCase;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/rebalance/proposals")
public class RebalanceController {

    private final RebalanceUseCase rebalanceUseCase;

    public RebalanceController(RebalanceUseCase rebalanceUseCase) {
        this.rebalanceUseCase = rebalanceUseCase;
    }

    @PostMapping
    public ResponseEntity<RebalanceUseCase.RebalanceProposalResponse> createProposal(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId,
            @Valid @RequestBody CreateProposalRequest request
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        try {
            return ResponseEntity.ok(rebalanceUseCase.createProposal(
                    effectiveUserId,
                    new RebalanceUseCase.RebalanceProposalRequest(
                            request.portfolioId(),
                            request.thresholdPercent()
                    )
            ));
        } catch (NoSuchElementException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{proposalId}")
    public ResponseEntity<RebalanceUseCase.RebalanceProposalResponse> getProposal(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId,
            @PathVariable UUID proposalId
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        return rebalanceUseCase.getProposal(effectiveUserId, proposalId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public record CreateProposalRequest(
            @NotNull Long portfolioId,
            @NotNull @DecimalMin("0.00") BigDecimal thresholdPercent
    ) {
    }
}


