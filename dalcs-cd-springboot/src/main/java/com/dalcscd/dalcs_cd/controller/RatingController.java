package com.dalcscd.dalcs_cd.controller;

import com.dalcscd.dalcs_cd.dto.RatingRequest;
import com.dalcscd.dalcs_cd.model.Rating;
import com.dalcscd.dalcs_cd.service.RatingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses/{courseId}/ratings")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public ResponseEntity<Rating> addOrUpdateRating(
            @PathVariable Long courseId,
            @Valid @RequestBody RatingRequest request,
            Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            Rating rating = ratingService.addOrUpdateRating(courseId, request, userEmail);
            return ResponseEntity.ok(rating);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
