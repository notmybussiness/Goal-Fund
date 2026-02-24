package com.goalfund.goalfund.adapter.in.web;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiErrorResponse(
        Instant timestamp,
        int status,
        String code,
        String message,
        String path,
        List<FieldErrorDetail> errors
) {

    public record FieldErrorDetail(
            String field,
            Object rejectedValue,
            String reason
    ) {
    }
}
