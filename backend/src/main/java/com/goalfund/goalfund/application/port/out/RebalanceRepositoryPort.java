package com.goalfund.goalfund.application.port.out;

import com.goalfund.goalfund.domain.model.RebalanceProposal;

import java.util.Optional;
import java.util.UUID;

public interface RebalanceRepositoryPort {

    RebalanceProposal save(RebalanceProposal proposal);

    Optional<RebalanceProposal> findById(UUID proposalId);
}


