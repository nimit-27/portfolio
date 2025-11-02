package com.nimit.portfolio.config;

import com.nimit.portfolio.model.Experience;
import com.nimit.portfolio.repository.ExperienceRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer {

    private final ExperienceRepository experienceRepository;

    public DataInitializer(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @PostConstruct
    public void seed() {
        if (experienceRepository.count() > 0) {
            return;
        }

        List<Experience> experiences = List.of(
                new Experience(
                        "Senior Software Developer",
                        "Incedo Inc.",
                        "Gurugram, India",
                        LocalDate.of(2021, 1, 1),
                        null,
                        "- AI-powered business analytics platform with customizable dashboards\n" +
                                "- React performance optimisation partnering with product managers\n" +
                                "- Modular data visualisation components for AI insights",
                        1
                ),
                new Experience(
                        "Game Development Intern",
                        "All Friends Studio",
                        "Remote",
                        LocalDate.of(2021, 6, 1),
                        LocalDate.of(2021, 7, 1),
                        "- Unity-based 2D car game with responsive physics\n" +
                                "- Built playful interactions to showcase creative coding",
                        2
                ),
                new Experience(
                        "B. Tech Engineering Physics",
                        "Delhi Technological University",
                        "Delhi, India",
                        LocalDate.of(2017, 8, 1),
                        LocalDate.of(2021, 5, 1),
                        "- Electronics minor in Robotics\n" +
                                "- Built engineering and visual projects including astrophysics HR-diagram explorations",
                        3
                )
        );

        experienceRepository.saveAll(experiences);
    }
}
