package com.goalfund.goalfund.adapter.out.memory;

import com.goalfund.goalfund.application.port.out.GoalRepositoryPort;
import com.goalfund.goalfund.domain.model.Goal;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class GoalMemoryRepository implements GoalRepositoryPort {

    private final ConcurrentHashMap<Long, Goal> goals = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(1L);

    @Override
    public Goal save(Goal goal) {
        Long id = goal.id() == null ? sequence.getAndIncrement() : goal.id();
        Goal persisted = new Goal(
                id,
                goal.userId(),
                goal.name(),
                goal.targetAmount(),
                goal.currentAmount(),
                goal.monthlyContribution(),
                goal.targetDate(),
                goal.status()
        );
        goals.put(id, persisted);
        return persisted;
    }

    @Override
    public List<Goal> findByUserId(Long userId) {
        return goals.values().stream()
                .filter(goal -> goal.userId().equals(userId))
                .toList();
    }

    @Override
    public Optional<Goal> findById(Long goalId) {
        return Optional.ofNullable(goals.get(goalId));
    }
}


