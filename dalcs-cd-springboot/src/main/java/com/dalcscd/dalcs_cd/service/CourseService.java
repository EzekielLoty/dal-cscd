package com.dalcscd.dalcs_cd.service;

import com.dalcscd.dalcs_cd.dto.CourseRequest;
import com.dalcscd.dalcs_cd.dto.CourseResponse;
import com.dalcscd.dalcs_cd.model.Course;
import com.dalcscd.dalcs_cd.repository.CourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<CourseResponse> getAllCourses(String search) {
        List<Course> courses;
        
        if (search != null && !search.trim().isEmpty()) {
            courses = courseRepository.findByNameContainingIgnoreCaseOrCodeContainingIgnoreCase(search, search);
        } else {
            courses = courseRepository.findAll();
        }

        return courses.stream()
                .map(CourseResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
        return CourseResponse.fromEntity(course);
    }

    @Transactional
    public CourseResponse createCourse(CourseRequest request) {
        Course course = new Course(
            request.getCode(),
            request.getName(),
            request.getPrerequisites(),
            request.getDescription(),
            request.getSyllabusUrl()
        );

        course = courseRepository.save(course);
        return CourseResponse.fromEntity(course);
    }

    @Transactional
    public CourseResponse updateCourse(Long id, CourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        course.setCode(request.getCode());
        course.setName(request.getName());
        course.setPrerequisites(request.getPrerequisites());
        course.setDescription(request.getDescription());
        course.setSyllabusUrl(request.getSyllabusUrl());

        course = courseRepository.save(course);
        return CourseResponse.fromEntity(course);
    }

    @Transactional
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new RuntimeException("Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }
}
