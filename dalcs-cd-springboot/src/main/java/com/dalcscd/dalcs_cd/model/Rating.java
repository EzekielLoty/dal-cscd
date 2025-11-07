package com.dalcscd.dalcs_cd.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "ratings", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "course_id"})
})
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Min(1)
    @Max(5)
    private Integer difficulty;

    @Min(1)
    @Max(5)
    private Integer timeCommitment;

    // Constructors
    public Rating() {}

    public Rating(Course course, User user, Integer difficulty, Integer timeCommitment) {
        this.course = course;
        this.user = user;
        this.difficulty = difficulty;
        this.timeCommitment = timeCommitment;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

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
