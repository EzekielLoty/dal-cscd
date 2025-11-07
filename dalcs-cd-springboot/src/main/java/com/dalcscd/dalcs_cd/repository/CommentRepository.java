package com.dalcscd.dalcs_cd.repository;

import com.dalcscd.dalcs_cd.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByCourseIdOrderByCreatedAtDesc(Long courseId);
}
