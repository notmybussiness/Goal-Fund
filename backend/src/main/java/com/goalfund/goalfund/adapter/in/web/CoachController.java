package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.CoachUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/coach")
public class CoachController {

    private final CoachUseCase coachUseCase;

    public CoachController(CoachUseCase coachUseCase) {
        this.coachUseCase = coachUseCase;
    }

    @GetMapping("/insights")
    public ResponseEntity<CoachUseCase.CoachInsightResponse> getInsights(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId,
            @RequestParam Long goalId,
            @RequestParam Long portfolioId
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        try {
            return ResponseEntity.ok(coachUseCase.getInsights(effectiveUserId, goalId, portfolioId));
        } catch (NoSuchElementException | IllegalArgumentException exception) {
            return ResponseEntity.notFound().build();
        }
    }
}


