package com.goalfund.goalfund.domain.event;

import java.time.LocalDateTime;

public record SimulationDataRefreshed(
        String refreshKey,
        LocalDateTime refreshedAt
) {
}


