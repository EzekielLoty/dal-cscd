import CourseCard from './CourseCard';
import './CourseList.css';

export default function CourseList({ courses }) {
  if (courses.length === 0) {
    return <p className="no-courses">No courses found.</p>;
  }

  return (
    <div className="course-list">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
