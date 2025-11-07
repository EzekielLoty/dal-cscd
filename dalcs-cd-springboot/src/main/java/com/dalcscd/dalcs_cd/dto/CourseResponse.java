package com.dalcscd.dalcs_cd.dto;

import com.dalcscd.dalcs_cd.model.Course;

public class CourseResponse {
    private Long id;
    private String code;
    private String name;
    private String prerequisites;
    private String description;
    private String syllabusUrl;
    private Double avgDifficulty;
    private Double avgTimeCommitment;

    // Constructors
    public CourseResponse() {}

    public CourseResponse(Long id, String code, String name, String prerequisites, 
                         String description, String syllabusUrl, 
                         Double avgDifficulty, Double avgTimeCommitment) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.prerequisites = prerequisites;
        this.description = description;
        this.syllabusUrl = syllabusUrl;
        this.avgDifficulty = avgDifficulty;
        this.avgTimeCommitment = avgTimeCommitment;
    }

    // Static factory method to convert from Course entity
    public static CourseResponse fromEntity(Course course) {
        return new CourseResponse(
            course.getId(),
            course.getCode(),
            course.getName(),
            course.getPrerequisites(),
            course.getDescription(),
            course.getSyllabusUrl(),
            course.getAvgDifficulty(),
            course.getAvgTimeCommitment()
        );
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(String prerequisites) {
        this.prerequisites = prerequisites;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSyllabusUrl() {
        return syllabusUrl;
    }

    public void setSyllabusUrl(String syllabusUrl) {
        this.syllabusUrl = syllabusUrl;
    }

    public Double getAvgDifficulty() {
        return avgDifficulty;
    }

    public void setAvgDifficulty(Double avgDifficulty) {
        this.avgDifficulty = avgDifficulty;
    }

    public Double getAvgTimeCommitment() {
        return avgTimeCommitment;
    }

    public void setAvgTimeCommitment(Double avgTimeCommitment) {
        this.avgTimeCommitment = avgTimeCommitment;
    }
}
