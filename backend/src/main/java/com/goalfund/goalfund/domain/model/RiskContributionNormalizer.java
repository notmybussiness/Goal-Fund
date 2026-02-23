package com.goalfund.goalfund.domain.model;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

public final class RiskContributionNormalizer {

    private RiskContributionNormalizer() {
    }

    public static List<RiskContribution> normalize(List<RiskContribution> raw) {
        BigDecimal total = raw.stream()
                .map(RiskContribution::riskPercent)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (total.compareTo(BigDecimal.ZERO) <= 0) {
            return raw;
        }

        List<RiskContribution> normalized = new ArrayList<>();
        BigDecimal running = BigDecimal.ZERO;

        for (int i = 0; i < raw.size(); i++) {
            RiskContribution item = raw.get(i);
            BigDecimal value;
            if (i == raw.size() - 1) {
                value = new BigDecimal("100.0000").subtract(running).setScale(4, RoundingMode.HALF_UP);
            } else {
                value = item.riskPercent()
                        .multiply(new BigDecimal("100"))
                        .divide(total, 4, RoundingMode.HALF_UP);
                running = running.add(value);
            }
            normalized.add(new RiskContribution(item.symbol(), value, item.factorExposureScore()));
        }
        return normalized;
    }
}


