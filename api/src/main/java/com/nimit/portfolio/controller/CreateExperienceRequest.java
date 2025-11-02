package com.nimit.portfolio.controller;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateExperienceRequest(
        @NotBlank String roleTitle,
        @NotBlank String companyName,
        @NotBlank String location,
        @NotBlank String startDate,
        String endDate,
        @NotBlank String descriptionMd,
        @NotNull @Min(0) Integer orderIndex
) {
}
