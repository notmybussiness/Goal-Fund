package com.goalfund.goalfund.application.port.out;

import com.goalfund.goalfund.domain.model.Goal;

import java.util.List;
import java.util.Optional;

public interface GoalRepositoryPort {

    Goal save(Goal goal);

    List<Goal> findByUserId(Long userId);

    Optional<Goal> findById(Long goalId);

    void deleteById(Long goalId);
}


