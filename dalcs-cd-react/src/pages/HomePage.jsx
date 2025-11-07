import { useState, useEffect } from 'react';
import { courseApi } from '../api/courseApi';
import CourseList from '../components/course/CourseList';
import SearchBar from '../components/course/SearchBar';
import './HomePage.css';

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, [search]);

  const fetchCourses = async () => {
    try {
      const response = await courseApi.getAll(search);
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <h1>Dal CS Course Directory</h1>
        <SearchBar value={search} onChange={setSearch} />
        {loading ? (
          <div className="loading">Loading courses...</div>
        ) : (
          <CourseList courses={courses} />
        )}
      </div>
    </div>
  );
}
