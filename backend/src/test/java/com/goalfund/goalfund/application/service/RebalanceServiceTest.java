package com.goalfund.goalfund.application.service;

import com.goalfund.goalfund.application.port.in.RebalanceUseCase;
import com.goalfund.goalfund.application.port.out.PortfolioRepositoryPort;
import com.goalfund.goalfund.application.port.out.RebalanceRepositoryPort;
import com.goalfund.goalfund.domain.model.AssetType;
import com.goalfund.goalfund.domain.model.Portfolio;
import com.goalfund.goalfund.domain.model.PortfolioHolding;
import com.goalfund.goalfund.domain.model.RebalanceProposal;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class RebalanceServiceTest {

    @Test
    void createProposal_setsZeroAmountForHoldActionsWithinThreshold() {
        PortfolioRepositoryPort portfolioRepositoryPort = mock(PortfolioRepositoryPort.class);
        RebalanceRepositoryPort rebalanceRepositoryPort = mock(RebalanceRepositoryPort.class);
        RebalanceService rebalanceService = new RebalanceService(portfolioRepositoryPort, rebalanceRepositoryPort);

        Portfolio portfolio = new Portfolio(
                11L,
                7L,
                "Core",
                "KRW",
                List.of(
                        new PortfolioHolding(
                                1L,
                                "AAA",
                                AssetType.STOCK,
                                new BigDecimal("1"),
                                new BigDecimal("5100"),
                                new BigDecimal("51.0000")
                        ),
                        new PortfolioHolding(
                                2L,
                                "BBB",
                                AssetType.STOCK,
                                new BigDecimal("1"),
                                new BigDecimal("4900"),
                                new BigDecimal("49.0000")
                        )
                )
        );

        when(portfolioRepositoryPort.findById(11L)).thenReturn(Optional.of(portfolio));
        when(rebalanceRepositoryPort.save(any(RebalanceProposal.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        RebalanceUseCase.RebalanceProposalResponse response = rebalanceService.createProposal(
                7L,
                new RebalanceUseCase.RebalanceProposalRequest(11L, new BigDecimal("2.0000"))
        );

        assertEquals(2, response.actions().size());
        assertTrue(response.actions().stream().allMatch(action -> "HOLD".equals(action.actionType())));
        assertTrue(response.actions().stream().allMatch(action -> action.amount().compareTo(BigDecimal.ZERO) == 0));
    }
}
