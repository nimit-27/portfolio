package com.nimit.portfolio.controller;

import com.nimit.portfolio.model.Experience;

import java.time.OffsetDateTime;

public record ExperienceResponse(
        Long id,
        String roleTitle,
        String companyName,
        String location,
        String startDate,
        String endDate,
        String descriptionMd,
        Integer orderIndex,
        OffsetDateTime createdAt
) {
    public static ExperienceResponse fromEntity(Experience experience) {
        return new ExperienceResponse(
                experience.getId(),
                experience.getRoleTitle(),
                experience.getCompanyName(),
                experience.getLocation(),
                experience.getStartDate().toString(),
                experience.getEndDate() != null ? experience.getEndDate().toString() : null,
                experience.getDescriptionMd(),
                experience.getOrderIndex(),
                experience.getCreatedAt()
        );
    }
}
