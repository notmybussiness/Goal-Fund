package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.GoalUseCase;
import com.goalfund.goalfund.application.port.in.PortfolioUseCase;
import com.goalfund.goalfund.domain.model.GoalStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.NoSuchElementException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {GoalController.class, PortfolioController.class, GlobalExceptionHandler.class})
class GlobalExceptionHandlerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GoalUseCase goalUseCase;

    @MockBean
    private PortfolioUseCase portfolioUseCase;

    @Test
    void returnsUnifiedValidationErrorResponse() throws Exception {
        mockMvc.perform(post("/api/v1/goals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.path").value("/api/v1/goals"))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors.length()").value(5));
    }

    @Test
    void returnsUnifiedBusinessErrorResponse() throws Exception {
        when(portfolioUseCase.addHolding(anyLong(), anyLong(), any()))
                .thenThrow(new NoSuchElementException("Portfolio not found"));

        mockMvc.perform(post("/api/v1/portfolios/99/holdings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "symbol": "AAPL",
                                  "assetType": "STOCK",
                                  "quantity": 1.0,
                                  "marketValue": 100.0
                                }
                                """))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.code").value("BUSINESS_ERROR"))
                .andExpect(jsonPath("$.message").value("Portfolio not found"))
                .andExpect(jsonPath("$.path").value("/api/v1/portfolios/99/holdings"))
                .andExpect(jsonPath("$.errors").doesNotExist());
    }

    @Test
    void keepsSuccessResponseContractUnchanged() throws Exception {
        when(goalUseCase.createGoal(anyLong(), any())).thenReturn(new GoalUseCase.GoalResponse(
                1L,
                "Emergency Fund",
                new BigDecimal("1000000"),
                new BigDecimal("100000"),
                new BigDecimal("50000"),
                LocalDate.of(2026, 12, 31),
                GoalStatus.ACTIVE,
                new BigDecimal("10.00")
        ));

        mockMvc.perform(post("/api/v1/goals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "Emergency Fund",
                                  "targetAmount": 1000000,
                                  "currentAmount": 100000,
                                  "monthlyContribution": 50000,
                                  "targetDate": "2026-12-31"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Emergency Fund"))
                .andExpect(jsonPath("$.targetAmount").value(1000000))
                .andExpect(jsonPath("$.code").doesNotExist())
                .andExpect(jsonPath("$.errors").doesNotExist());
    }
}
