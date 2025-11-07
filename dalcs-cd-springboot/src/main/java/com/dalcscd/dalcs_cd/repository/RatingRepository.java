package com.dalcscd.dalcs_cd.repository;

import com.dalcscd.dalcs_cd.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByUserIdAndCourseId(Long userId, Long courseId);

    @Query("SELECT AVG(r.difficulty) FROM Rating r WHERE r.course.id = :courseId")
    Double avgDifficulty(@Param("courseId") Long courseId);

    @Query("SELECT AVG(r.timeCommitment) FROM Rating r WHERE r.course.id = :courseId")
    Double avgTimeCommitment(@Param("courseId") Long courseId);
}
