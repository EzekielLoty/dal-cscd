package com.dalcscd.dalcs_cd.repository;

import com.dalcscd.dalcs_cd.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByNameContainingIgnoreCaseOrCodeContainingIgnoreCase(String name, String code);
}
