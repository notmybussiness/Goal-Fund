package com.goalfund.goalfund.domain;

import com.goalfund.goalfund.domain.model.RiskContribution;
import com.goalfund.goalfund.domain.model.RiskContributionNormalizer;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RiskContributionNormalizerTest {

    @Test
    void normalize_shouldReturnHundredPercentTotal() {
        List<RiskContribution> raw = List.of(
                new RiskContribution("BTC", new BigDecimal("70"), new BigDecimal("75")),
                new RiskContribution("SPY", new BigDecimal("20"), new BigDecimal("40"))
        );

        List<RiskContribution> normalized = RiskContributionNormalizer.normalize(raw);

        BigDecimal total = normalized.stream()
                .map(RiskContribution::riskPercent)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        assertEquals(new BigDecimal("100.0000"), total);
    }
}


