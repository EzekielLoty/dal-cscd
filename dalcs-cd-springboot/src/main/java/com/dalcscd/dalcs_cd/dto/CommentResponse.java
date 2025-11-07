package com.dalcscd.dalcs_cd.dto;

import com.dalcscd.dalcs_cd.model.Comment;

import java.time.LocalDateTime;

public class CommentResponse {
    private Long id;
    private String userName;
    private String content;
    private LocalDateTime createdAt;

    // Constructors
    public CommentResponse() {}

    public CommentResponse(Long id, String userName, String content, LocalDateTime createdAt) {
        this.id = id;
        this.userName = userName;
        this.content = content;
        this.createdAt = createdAt;
    }

    // Static factory method
    public static CommentResponse fromEntity(Comment comment) {
        return new CommentResponse(
            comment.getId(),
            comment.getUser().getName(),
            comment.getContent(),
            comment.getCreatedAt()
        );
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
