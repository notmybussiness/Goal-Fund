package com.goalfund.goalfund.domain.model;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

public record Goal(
        Long id,
        Long userId,
        String name,
        BigDecimal targetAmount,
        BigDecimal currentAmount,
        BigDecimal monthlyContribution,
        LocalDate targetDate,
        GoalStatus status
) {
    public BigDecimal progressPercent() {
        if (targetAmount == null || targetAmount.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO.setScale(4, RoundingMode.HALF_UP);
        }
        return currentAmount
                .multiply(new BigDecimal("100"))
                .divide(targetAmount, 4, RoundingMode.HALF_UP);
    }
}


