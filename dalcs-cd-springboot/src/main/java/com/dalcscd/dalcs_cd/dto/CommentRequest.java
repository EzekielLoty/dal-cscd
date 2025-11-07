package com.dalcscd.dalcs_cd.dto;

import jakarta.validation.constraints.NotBlank;

public class CommentRequest {
    @NotBlank(message = "Comment content is required")
    private String content;

    // Constructors
    public CommentRequest() {}

    public CommentRequest(String content) {
        this.content = content;
    }

    // Getters and Setters
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
