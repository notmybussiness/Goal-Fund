package com.goalfund.goalfund.application.service;

import com.goalfund.goalfund.application.port.in.RebalanceUseCase;
import com.goalfund.goalfund.application.port.out.PortfolioRepositoryPort;
import com.goalfund.goalfund.application.port.out.RebalanceRepositoryPort;
import com.goalfund.goalfund.domain.model.Portfolio;
import com.goalfund.goalfund.domain.model.RebalanceAction;
import com.goalfund.goalfund.domain.model.RebalanceActionType;
import com.goalfund.goalfund.domain.model.RebalanceProposal;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class RebalanceService implements RebalanceUseCase {

    private final PortfolioRepositoryPort portfolioRepositoryPort;
    private final RebalanceRepositoryPort rebalanceRepositoryPort;

    public RebalanceService(
            PortfolioRepositoryPort portfolioRepositoryPort,
            RebalanceRepositoryPort rebalanceRepositoryPort
    ) {
        this.portfolioRepositoryPort = portfolioRepositoryPort;
        this.rebalanceRepositoryPort = rebalanceRepositoryPort;
    }

    @Override
    public RebalanceProposalResponse createProposal(Long userId, RebalanceProposalRequest request) {
        Portfolio portfolio = portfolioRepositoryPort.findById(request.portfolioId())
                .filter(p -> p.userId().equals(userId))
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));

        List<RebalanceAction> actions = new ArrayList<>();
        BigDecimal equalWeight = portfolio.holdings().isEmpty()
                ? BigDecimal.ZERO
                : new BigDecimal("100")
                .divide(BigDecimal.valueOf(portfolio.holdings().size()), 4, RoundingMode.HALF_UP);
        BigDecimal totalValue = portfolio.totalMarketValue();

        for (var holding : portfolio.holdings()) {
            BigDecimal diff = holding.weightPercent().subtract(equalWeight).abs();
            RebalanceActionType type = RebalanceActionType.HOLD;
            if (diff.compareTo(request.thresholdPercent()) > 0) {
                type = holding.weightPercent().compareTo(equalWeight) > 0
                        ? RebalanceActionType.SELL
                        : RebalanceActionType.BUY;
            }
            BigDecimal amount = diff.multiply(totalValue).divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP);
            actions.add(new RebalanceAction(holding.symbol(), type, amount));
        }

        RebalanceProposal proposal = rebalanceRepositoryPort.save(new RebalanceProposal(
                UUID.randomUUID(),
                portfolio.id(),
                "Equal weight rebalance proposal generated",
                LocalDateTime.now(),
                actions
        ));

        return toResponse(proposal);
    }

    @Override
    public Optional<RebalanceProposalResponse> getProposal(Long userId, UUID proposalId) {
        return rebalanceRepositoryPort.findById(proposalId)
                .flatMap(proposal -> portfolioRepositoryPort.findById(proposal.portfolioId())
                        .filter(p -> p.userId().equals(userId))
                        .map(p -> proposal))
                .map(this::toResponse);
    }

    private RebalanceProposalResponse toResponse(RebalanceProposal proposal) {
        return new RebalanceProposalResponse(
                proposal.id(),
                proposal.portfolioId(),
                proposal.summary(),
                proposal.createdAt(),
                proposal.actions().stream()
                        .map(a -> new RebalanceActionItem(a.symbol(), a.actionType().name(), a.amount()))
                        .toList()
        );
    }
}


