import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseApi } from '../../api/courseApi';
import { validateCourseForm } from '../../utils/validation';
import './CourseForm.css';

export default function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    prerequisites: '',
    syllabusUrl: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await courseApi.getById(id);
      setFormData(response.data);
    } catch (error) {
      setServerError('Failed to load course');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validateCourseForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      if (isEdit) {
        await courseApi.update(id, formData);
      } else {
        await courseApi.create(formData);
      }
      navigate('/admin');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to save course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-form-page">
      <div className="container">
        <div className="course-form-container">
          <h2>{isEdit ? 'Edit Course' : 'Create New Course'}</h2>
          {serverError && <div className="error-message">{serverError}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Course Code *</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g., CSCI 1000"
              />
              {errors.code && <div className="error-message">{errors.code}</div>}
            </div>

            <div className="form-group">
              <label>Course Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Introduction to Computer Science"
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Course description..."
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Prerequisites</label>
              <input
                type="text"
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleChange}
                placeholder="e.g., CSCI 1000, MATH 1000"
              />
            </div>

            <div className="form-group">
              <label>Syllabus URL</label>
              <input
                type="url"
                name="syllabusUrl"
                value={formData.syllabusUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
              {errors.syllabusUrl && (
                <div className="error-message">{errors.syllabusUrl}</div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : isEdit ? 'Update Course' : 'Create Course'}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/admin')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
