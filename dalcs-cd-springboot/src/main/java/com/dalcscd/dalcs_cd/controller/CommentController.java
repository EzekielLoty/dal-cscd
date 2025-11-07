package com.dalcscd.dalcs_cd.controller;

import com.dalcscd.dalcs_cd.dto.CommentRequest;
import com.dalcscd.dalcs_cd.dto.CommentResponse;
import com.dalcscd.dalcs_cd.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses/{courseId}/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<List<CommentResponse>> getCourseComments(@PathVariable Long courseId) {
        return ResponseEntity.ok(commentService.getCourseComments(courseId));
    }

    @PostMapping
    public ResponseEntity<CommentResponse> addComment(
            @PathVariable Long courseId,
            @Valid @RequestBody CommentRequest request,
            Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            CommentResponse response = commentService.addComment(courseId, request, userEmail);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
