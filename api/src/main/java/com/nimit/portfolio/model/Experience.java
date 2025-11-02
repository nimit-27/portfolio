package com.nimit.portfolio.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "experiences")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role_title", nullable = false)
    private String roleTitle;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "description_md", columnDefinition = "TEXT")
    private String descriptionMd;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    public Experience() {
    }

    public Experience(String roleTitle, String companyName, String location, LocalDate startDate, LocalDate endDate,
                      String descriptionMd, Integer orderIndex) {
        this.roleTitle = roleTitle;
        this.companyName = companyName;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.descriptionMd = descriptionMd;
        this.orderIndex = orderIndex;
        this.createdAt = OffsetDateTime.now();
    }

    @PrePersist
    public void onCreate() {
        if (createdAt == null) {
            createdAt = OffsetDateTime.now();
        }
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public String getRoleTitle() {
        return roleTitle;
    }

    public void setRoleTitle(String roleTitle) {
        this.roleTitle = roleTitle;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getDescriptionMd() {
        return descriptionMd;
    }

    public void setDescriptionMd(String descriptionMd) {
        this.descriptionMd = descriptionMd;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
