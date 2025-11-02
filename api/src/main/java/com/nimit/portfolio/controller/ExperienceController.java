package com.nimit.portfolio.controller;

import com.nimit.portfolio.model.Experience;
import com.nimit.portfolio.service.ExperienceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "*")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public List<ExperienceResponse> listExperiences() {
        return experienceService.listExperiences().stream().map(ExperienceResponse::fromEntity).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExperienceResponse createExperience(@Valid @RequestBody CreateExperienceRequest request) {
        Experience experience = experienceService.createExperience(
                request.roleTitle(),
                request.companyName(),
                request.location(),
                LocalDate.parse(request.startDate()),
                request.endDate() != null && !request.endDate().isBlank() ? LocalDate.parse(request.endDate()) : null,
                request.descriptionMd(),
                request.orderIndex()
        );
        return ExperienceResponse.fromEntity(experience);
    }
}
