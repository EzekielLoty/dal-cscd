import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courseApi } from '../api/courseApi';
import { commentApi } from '../api/commentApi';
import { useAuth } from '../context/AuthContext';
import RatingDisplay from '../components/rating/RatingDisplay';
import RatingForm from '../components/rating/RatingForm';
import CommentList from '../components/comment/CommentList';
import CommentForm from '../components/comment/CommentForm';
import './CourseDetailPage.css';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchCourse();
    fetchComments();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await courseApi.getById(id);
      setCourse(response.data);
    } catch (error) {
      console.error('Failed to fetch course:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentApi.getAll(id);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  if (!course) return <div className="loading">Loading...</div>;

  return (
    <div className="course-detail-page">
      <div className="container">
        <div className="course-header">
          <h1>{course.code}: {course.name}</h1>
          <p className="course-description">{course.description}</p>
          
          {course.prerequisites && (
            <p className="prerequisites">
              <strong>Prerequisites:</strong> {course.prerequisites}
            </p>
          )}

          {course.syllabusUrl && (
            <a href={course.syllabusUrl} target="_blank" rel="noopener noreferrer" className="syllabus-link">
              View Syllabus
            </a>
          )}
        </div>

        <RatingDisplay 
          avgDifficulty={course.avgDifficulty} 
          avgTimeCommitment={course.avgTimeCommitment} 
        />

        {user && <RatingForm courseId={id} onSuccess={fetchCourse} />}

        <div className="comments-section">
          <h2>Comments</h2>
          {user && <CommentForm courseId={id} onSuccess={fetchComments} />}
          {console.log(comments)}
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
}
