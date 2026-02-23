package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.GoalUseCase;
import com.goalfund.goalfund.domain.model.GoalStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/goals")
public class GoalController {

    private final GoalUseCase goalUseCase;

    public GoalController(GoalUseCase goalUseCase) {
        this.goalUseCase = goalUseCase;
    }

    @PostMapping
    public ResponseEntity<GoalUseCase.GoalResponse> createGoal(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId,
            @Valid @RequestBody CreateGoalRequest request
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        GoalUseCase.GoalResponse response = goalUseCase.createGoal(
                effectiveUserId,
                new GoalUseCase.GoalCommand(
                        request.name(),
                        request.targetAmount(),
                        request.currentAmount(),
                        request.monthlyContribution(),
                        request.targetDate()
                )
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<GoalUseCase.GoalResponse>> getGoals(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        return ResponseEntity.ok(goalUseCase.getGoals(effectiveUserId));
    }

    @GetMapping("/{goalId}")
    public ResponseEntity<GoalUseCase.GoalResponse> getGoal(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId,
            @PathVariable Long goalId
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        return goalUseCase.getGoal(effectiveUserId, goalId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/{goalId}")
    public ResponseEntity<GoalUseCase.GoalResponse> updateGoal(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId,
            @PathVariable Long goalId,
            @Valid @RequestBody PatchGoalRequest request
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        return goalUseCase.updateGoal(
                        effectiveUserId,
                        goalId,
                        new GoalUseCase.GoalPatchCommand(
                                request.currentAmount(),
                                request.monthlyContribution(),
                                request.status()
                        )
                )
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<Void> deleteGoal(
            @RequestHeader(value = "X-USER-ID", required = false) Long userId,
            @PathVariable Long goalId
    ) {
        Long effectiveUserId = userId == null ? 1L : userId;
        if (goalUseCase.deleteGoal(effectiveUserId, goalId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    public record CreateGoalRequest(
            @NotBlank String name,
            @NotNull @DecimalMin("0.01") BigDecimal targetAmount,
            @NotNull @DecimalMin("0.00") BigDecimal currentAmount,
            @NotNull @DecimalMin("0.00") BigDecimal monthlyContribution,
            @NotNull LocalDate targetDate
    ) {
    }

    public record PatchGoalRequest(
            @DecimalMin("0.00") BigDecimal currentAmount,
            @DecimalMin("0.00") BigDecimal monthlyContribution,
            GoalStatus status
    ) {
    }
}


