package com.dalcscd.dalcs_cd.service;

import com.dalcscd.dalcs_cd.dto.RatingRequest;
import com.dalcscd.dalcs_cd.model.Course;
import com.dalcscd.dalcs_cd.model.Rating;
import com.dalcscd.dalcs_cd.model.User;
import com.dalcscd.dalcs_cd.repository.CourseRepository;
import com.dalcscd.dalcs_cd.repository.RatingRepository;
import com.dalcscd.dalcs_cd.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public RatingService(RatingRepository ratingRepository, 
                        CourseRepository courseRepository,
                        UserRepository userRepository) {
        this.ratingRepository = ratingRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Rating addOrUpdateRating(Long courseId, RatingRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));

        // Check if user already rated this course
        Rating rating = ratingRepository.findByUserIdAndCourseId(user.getId(), courseId)
                .orElse(new Rating(course, user, request.getDifficulty(), request.getTimeCommitment()));

        // Update rating values
        rating.setDifficulty(request.getDifficulty());
        rating.setTimeCommitment(request.getTimeCommitment());

        rating = ratingRepository.save(rating);

        // Update course averages
        updateCourseAverages(course);

        return rating;
    }

    private void updateCourseAverages(Course course) {
        Double avgDiff = ratingRepository.avgDifficulty(course.getId());
        Double avgTime = ratingRepository.avgTimeCommitment(course.getId());

        course.setAvgDifficulty(avgDiff != null ? avgDiff : 0.0);
        course.setAvgTimeCommitment(avgTime != null ? avgTime : 0.0);

        courseRepository.save(course);
    }
}
