package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.RiskUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/risk")
public class RiskController {

    private final RiskUseCase riskUseCase;

    public RiskController(RiskUseCase riskUseCase) {
        this.riskUseCase = riskUseCase;
    }

    @GetMapping("/snapshot")
    public ResponseEntity<RiskUseCase.RiskSnapshotResponse> getSnapshot(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId,
            @RequestParam Long portfolioId
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        return ResponseEntity.ok(riskUseCase.getSnapshot(effectiveUserId, portfolioId));
    }
}


