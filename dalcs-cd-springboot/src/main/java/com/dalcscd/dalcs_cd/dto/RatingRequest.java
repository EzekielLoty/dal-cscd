package com.dalcscd.dalcs_cd.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class RatingRequest {
    @NotNull(message = "Difficulty rating is required")
    @Min(value = 1, message = "Difficulty must be between 1 and 5")
    @Max(value = 5, message = "Difficulty must be between 1 and 5")
    private Integer difficulty;

    @NotNull(message = "Time commitment rating is required")
    @Min(value = 1, message = "Time commitment must be between 1 and 5")
    @Max(value = 5, message = "Time commitment must be between 1 and 5")
    private Integer timeCommitment;

    // Constructors
    public RatingRequest() {}

    public RatingRequest(Integer difficulty, Integer timeCommitment) {
        this.difficulty = difficulty;
        this.timeCommitment = timeCommitment;
    }

    // Getters and Setters
    public Integer getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Integer difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getTimeCommitment() {
        return timeCommitment;
    }

    public void setTimeCommitment(Integer timeCommitment) {
        this.timeCommitment = timeCommitment;
    }
}
