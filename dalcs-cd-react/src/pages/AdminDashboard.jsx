import { useState, useEffect } from 'react';
import { courseApi } from '../api/courseApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      return;
    }
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseApi.getAll();
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseApi.delete(id);
        fetchCourses();
      } catch (error) {
        alert('Failed to delete course');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button
            onClick={() => navigate('/admin/courses/new')}
            className="btn-success"
          >
            + New Course
          </button>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-item card">
              <div className="course-info">
                <h3>{course.code}: {course.name}</h3>
                <p>{course.description}</p>
              </div>
              <div className="course-actions">
                <button
                  onClick={() => navigate(`/admin/courses/${course.id}/edit`)}
                  className="btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
