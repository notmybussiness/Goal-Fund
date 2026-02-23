package com.goalfund.goalfund.domain;

import com.goalfund.goalfund.domain.model.MonteCarloSimulationEngine;
import com.goalfund.goalfund.domain.model.MonteCarloSummary;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertTrue;

class MonteCarloSimulationEngineTest {

    @Test
    void simulate_shouldReturnProbabilityWithinRange() {
        MonteCarloSummary summary = MonteCarloSimulationEngine.simulate(
                new BigDecimal("30000000"),
                new BigDecimal("100000000"),
                new BigDecimal("1000000"),
                60,
                500,
                42L
        );

        assertTrue(summary.successProbabilityPercent().compareTo(BigDecimal.ZERO) >= 0);
        assertTrue(summary.successProbabilityPercent().compareTo(new BigDecimal("100")) <= 0);
    }
}


