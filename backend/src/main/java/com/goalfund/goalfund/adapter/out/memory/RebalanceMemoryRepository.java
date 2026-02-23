package com.goalfund.goalfund.adapter.out.memory;

import com.goalfund.goalfund.application.port.out.RebalanceRepositoryPort;
import com.goalfund.goalfund.domain.model.RebalanceProposal;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RebalanceMemoryRepository implements RebalanceRepositoryPort {

    private final ConcurrentHashMap<UUID, RebalanceProposal> proposals = new ConcurrentHashMap<>();

    @Override
    public RebalanceProposal save(RebalanceProposal proposal) {
        proposals.put(proposal.id(), proposal);
        return proposal;
    }

    @Override
    public Optional<RebalanceProposal> findById(UUID proposalId) {
        return Optional.ofNullable(proposals.get(proposalId));
    }
}


