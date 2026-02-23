package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.PortfolioUseCase;
import com.goalfund.goalfund.domain.model.AssetType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/portfolios")
public class PortfolioController {

    private final PortfolioUseCase portfolioUseCase;

    public PortfolioController(PortfolioUseCase portfolioUseCase) {
        this.portfolioUseCase = portfolioUseCase;
    }

    @PostMapping
    public ResponseEntity<PortfolioUseCase.PortfolioResponse> createPortfolio(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId,
            @Valid @RequestBody CreatePortfolioRequest request
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        return ResponseEntity.ok(portfolioUseCase.createPortfolio(
                effectiveUserId,
                new PortfolioUseCase.CreatePortfolioCommand(request.name(), request.baseCurrency())
        ));
    }

    @PostMapping("/{id}/holdings")
    public ResponseEntity<PortfolioUseCase.PortfolioResponse> addHolding(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId,
            @PathVariable Long id,
            @Valid @RequestBody AddHoldingRequest request
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        return portfolioUseCase.addHolding(
                        effectiveUserId,
                        id,
                        new PortfolioUseCase.AddHoldingCommand(
                                request.symbol(),
                                request.assetType(),
                                request.quantity(),
                                request.marketValue()
                        )
                )
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public record CreatePortfolioRequest(
            @NotBlank String name,
            String baseCurrency
    ) {
    }

    public record AddHoldingRequest(
            @NotBlank String symbol,
            @NotNull AssetType assetType,
            @NotNull @DecimalMin("0.00000001") BigDecimal quantity,
            @NotNull @DecimalMin("0.00") BigDecimal marketValue
    ) {
    }
}


