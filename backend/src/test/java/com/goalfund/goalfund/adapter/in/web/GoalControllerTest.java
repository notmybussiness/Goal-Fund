package com.goalfund.goalfund.adapter.in.web;

import com.goalfund.goalfund.application.port.in.GoalUseCase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(GoalController.class)
class GoalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GoalUseCase goalUseCase;

    @Test
    void deleteGoal_returnsNoContent_whenDeleteSucceeds() throws Exception {
        when(goalUseCase.deleteGoal(1L, 3L)).thenReturn(true);

        mockMvc.perform(delete("/api/v1/goals/{goalId}", 3L))
                .andExpect(status().isNoContent());

        verify(goalUseCase).deleteGoal(1L, 3L);
    }

    @Test
    void deleteGoal_returnsNotFound_whenGoalDoesNotExist() throws Exception {
        when(goalUseCase.deleteGoal(1L, 99L)).thenReturn(false);

        mockMvc.perform(delete("/api/v1/goals/{goalId}", 99L))
                .andExpect(status().isNotFound());

        verify(goalUseCase).deleteGoal(1L, 99L);
    }
}
