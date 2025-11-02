package com.nimit.portfolio.graphql;

import com.nimit.portfolio.model.Experience;
import com.nimit.portfolio.service.ExperienceService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ExperienceGraphqlController {

    private final ExperienceService experienceService;

    public ExperienceGraphqlController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @QueryMapping
    public List<Experience> experiences() {
        return experienceService.listExperiences();
    }

    @QueryMapping
    public Experience experienceById(@Argument Long id) {
        return experienceService.getExperience(id);
    }
}
