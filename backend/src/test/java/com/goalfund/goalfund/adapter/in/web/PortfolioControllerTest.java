package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.PortfolioUseCase;
import com.goalfund.goalfund.domain.model.AssetType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PortfolioController.class)
class PortfolioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PortfolioUseCase portfolioUseCase;

    @Test
    void addHolding_returnsNotFound_whenPortfolioDoesNotExist() throws Exception {
        when(portfolioUseCase.addHolding(eq(1L), eq(99L), any())).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/v1/portfolios/{id}/holdings", 99L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "symbol": "SPY",
                                  "assetType": "STOCK",
                                  "quantity": 1.00000000,
                                  "marketValue": 1000.00
                                }
                                """))
                .andExpect(status().isNotFound());
    }

    @Test
    void addHolding_returnsOk_whenHoldingIsAdded() throws Exception {
        PortfolioUseCase.PortfolioResponse response = new PortfolioUseCase.PortfolioResponse(
                1L,
                "Main",
                "KRW",
                new BigDecimal("1000.00"),
                List.of(new PortfolioUseCase.PortfolioHoldingResponse(
                        1L,
                        "SPY",
                        AssetType.STOCK,
                        new BigDecimal("1.00000000"),
                        new BigDecimal("1000.00"),
                        new BigDecimal("100.0000")
                ))
        );
        when(portfolioUseCase.addHolding(eq(1L), eq(1L), any())).thenReturn(Optional.of(response));

        mockMvc.perform(post("/api/v1/portfolios/{id}/holdings", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "symbol": "SPY",
                                  "assetType": "STOCK",
                                  "quantity": 1.00000000,
                                  "marketValue": 1000.00
                                }
                                """))
                .andExpect(status().isOk());
    }
}
