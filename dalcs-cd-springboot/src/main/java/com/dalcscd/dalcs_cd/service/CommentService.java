package com.dalcscd.dalcs_cd.service;

import com.dalcscd.dalcs_cd.dto.CommentRequest;
import com.dalcscd.dalcs_cd.dto.CommentResponse;
import com.dalcscd.dalcs_cd.model.Comment;
import com.dalcscd.dalcs_cd.model.Course;
import com.dalcscd.dalcs_cd.model.User;
import com.dalcscd.dalcs_cd.repository.CommentRepository;
import com.dalcscd.dalcs_cd.repository.CourseRepository;
import com.dalcscd.dalcs_cd.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository,
                         CourseRepository courseRepository,
                         UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CommentResponse addComment(Long courseId, CommentRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));

        Comment comment = new Comment(user, course, request.getContent());
        comment = commentRepository.save(comment);

        return CommentResponse.fromEntity(comment);
    }

    public List<CommentResponse> getCourseComments(Long courseId) {
        List<Comment> comments = commentRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
        return comments.stream()
                .map(CommentResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
