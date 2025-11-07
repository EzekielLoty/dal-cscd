import { Link } from 'react-router-dom';
import './CourseCard.css';

export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.id}`} className="course-card-link">
      <div className="course-card card">
        <h3 className="course-code">{course.code}</h3>
        <h4 className="course-name">{course.name}</h4>
        <p className="course-desc">{course.description}</p>
        
        <div className="course-ratings">
          <div className="rating-item">
            <span className="rating-label">Difficulty:</span>
            <span className="rating-value">
              {course.avgDifficulty ? `${course.avgDifficulty.toFixed(1)}/5` : 'N/A'}
            </span>
          </div>
          <div className="rating-item">
            <span className="rating-label">Time:</span>
            <span className="rating-value">
              {course.avgTimeCommitment ? `${course.avgTimeCommitment.toFixed(1)}/5` : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
