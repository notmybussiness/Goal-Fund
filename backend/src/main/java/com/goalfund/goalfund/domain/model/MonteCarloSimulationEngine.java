package com.goalfund.goalfund.domain.model;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public final class MonteCarloSimulationEngine {

    private MonteCarloSimulationEngine() {
    }

    public static MonteCarloSummary simulate(
            BigDecimal currentAmount,
            BigDecimal targetAmount,
            BigDecimal monthlyContribution,
            int months,
            int scenarios,
            long seed
    ) {
        Random random = new Random(seed);
        List<BigDecimal> outcomes = new ArrayList<>(scenarios);
        int successCount = 0;

        for (int i = 0; i < scenarios; i++) {
            BigDecimal value = currentAmount;
            for (int m = 0; m < months; m++) {
                double shock = random.nextGaussian() * 0.03;
                BigDecimal growth = value.multiply(BigDecimal.valueOf(shock));
                value = value.add(growth).add(monthlyContribution);
            }
            outcomes.add(value);
            if (value.compareTo(targetAmount) >= 0) {
                successCount++;
            }
        }

        Collections.sort(outcomes);

        BigDecimal successProbability = BigDecimal.valueOf(successCount)
                .multiply(new BigDecimal("100"))
                .divide(BigDecimal.valueOf(scenarios), 4, RoundingMode.HALF_UP);

        BigDecimal p10 = percentile(outcomes, 10);
        BigDecimal p50 = percentile(outcomes, 50);
        BigDecimal p90 = percentile(outcomes, 90);

        return new MonteCarloSummary(successProbability, p10, p50, p90);
    }

    private static BigDecimal percentile(List<BigDecimal> values, int p) {
        if (values.isEmpty()) {
            return BigDecimal.ZERO;
        }
        int idx = (int) Math.floor((p / 100.0) * (values.size() - 1));
        return values.get(Math.max(0, Math.min(idx, values.size() - 1))).setScale(4, RoundingMode.HALF_UP);
    }
}


