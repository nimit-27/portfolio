package com.nimit.portfolio.service;

import com.nimit.portfolio.model.Experience;
import com.nimit.portfolio.repository.ExperienceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    public List<Experience> listExperiences() {
        return experienceRepository.findAllByOrderByOrderIndexAsc();
    }

    public Experience getExperience(Long id) {
        return experienceRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Experience not found"));
    }

    @Transactional
    public Experience createExperience(String roleTitle, String companyName, String location, LocalDate startDate,
                                       LocalDate endDate, String descriptionMd, Integer orderIndex) {
        Experience experience = new Experience(roleTitle, companyName, location, startDate, endDate, descriptionMd, orderIndex);
        return experienceRepository.save(experience);
    }
}
