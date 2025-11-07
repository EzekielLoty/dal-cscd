package com.dalcscd.dalcs_cd.dto;

import jakarta.validation.constraints.NotBlank;

public class CourseRequest {
    @NotBlank(message = "Course code is required")
    private String code;

    @NotBlank(message = "Course name is required")
    private String name;

    private String prerequisites;
    private String description;
    private String syllabusUrl;

    // Constructors
    public CourseRequest() {}

    public CourseRequest(String code, String name, String prerequisites, String description, String syllabusUrl) {
        this.code = code;
        this.name = name;
        this.prerequisites = prerequisites;
        this.description = description;
        this.syllabusUrl = syllabusUrl;
    }

    // Getters and Setters
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
}
