import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { courseApi } from '../api/courseApi';
import { authApi } from '../api/authApi';
import './DebugPage.css';

export default function DebugPage() {
  const { user, token, login, logout, isAdmin } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  
  // Test credentials
  const [testEmail, setTestEmail] = useState('');
  const [testPassword, setTestPassword] = useState('');

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await courseApi.getAll();
      setCourses(response.data);
      setApiResponse({
        status: 'success',
        data: response.data,
        count: response.data.length
      });
    } catch (err) {
      setError(err.message);
      setApiResponse({
        status: 'error',
        error: err.response?.data || err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    if (!testEmail || !testPassword) {
      alert('Please enter email and password');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await authApi.login({ email: testEmail, password: testPassword });
      const { token, email: userEmail, name, role } = response.data;
      login(token, { email: userEmail, name, role });
      alert('Login successful!');
    } catch (err) {
      setError('Login failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    if (!testEmail || !testPassword) {
      alert('Please enter email and password');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await authApi.register({ 
        email: testEmail, 
        password: testPassword,
        name: 'Test User'
      });
      const { token, email: userEmail, name, role } = response.data;
      login(token, { email: userEmail, name, role });
      alert('Registration successful!');
    } catch (err) {
      setError('Registration failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const checkBackendHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/courses');
      const data = await response.json();
      setApiResponse({
        status: 'Backend is running',
        statusCode: response.status,
        data: data,
        count: data.length
      });
    } catch (err) {
      setApiResponse({
        status: 'Backend is NOT running or CORS error',
        error: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="debug-page">
      <div className="container">
        <h1>🔧 Debug Dashboard</h1>
        
        {/* User Status Section */}
        <div className="debug-section card">
          <h2>👤 User Status</h2>
          <div className="status-grid">
            <div className="status-item">
              <span className="label">Logged In:</span>
              <span className={`value ${user ? 'success' : 'error'}`}>
                {user ? '✅ YES' : '❌ NO'}
              </span>
            </div>
            <div className="status-item">
              <span className="label">User Email:</span>
              <span className="value">{user?.email || 'N/A'}</span>
            </div>
            <div className="status-item">
              <span className="label">User Name:</span>
              <span className="value">{user?.name || 'N/A'}</span>
            </div>
            <div className="status-item">
              <span className="label">User Role:</span>
              <span className={`value ${isAdmin() ? 'admin' : 'user'}`}>
                {user?.role || 'N/A'} {isAdmin() ? '👑' : ''}
              </span>
            </div>
            <div className="status-item">
              <span className="label">Has Token:</span>
              <span className={`value ${token ? 'success' : 'error'}`}>
                {token ? '✅ YES' : '❌ NO'}
              </span>
            </div>
            <div className="status-item">
              <span className="label">Token Preview:</span>
              <span className="value token-preview">{token ? token.substring(0, 30) + '...' : 'N/A'}</span>
            </div>
          </div>
          
          {user && (
            <button onClick={logout} className="btn-danger" style={{marginTop: '20px'}}>
              Logout
            </button>
          )}
        </div>

        {/* Test Login Section */}
        <div className="debug-section card">
          <h2>🔐 Test Authentication</h2>
          <div className="test-form">
            <input
              type="email"
              placeholder="Email (e.g., test@dal.ca)"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
            />
            <div className="button-group">
              <button onClick={testLogin} className="btn-primary" disabled={loading}>
                Test Login
              </button>
              <button onClick={testRegister} className="btn-success" disabled={loading}>
                Test Register
              </button>
            </div>
          </div>
          
          <div className="test-credentials">
            <h4>Test Credentials:</h4>
            <p>• Regular User: <code>user@dal.ca</code> / <code>password</code></p>
            <p>• Admin User: <code>admin@dal.ca</code> / <code>password</code></p>
            <p>• Create New: Use any <code>*@dal.ca</code> email</p>
          </div>
        </div>

        {/* Courses Section */}
        <div className="debug-section card">
          <h2>📚 Courses Data</h2>
          <div className="status-grid">
            <div className="status-item">
              <span className="label">Courses Loaded:</span>
              <span className={`value ${courses.length > 0 ? 'success' : 'error'}`}>
                {courses.length > 0 ? `✅ ${courses.length} courses` : '❌ No courses'}
              </span>
            </div>
            <div className="status-item">
              <span className="label">Loading:</span>
              <span className="value">{loading ? '⏳ YES' : '✅ NO'}</span>
            </div>
            <div className="status-item">
              <span className="label">Error:</span>
              <span className={`value ${error ? 'error' : 'success'}`}>
                {error || '✅ None'}
              </span>
            </div>
          </div>
          
          <div className="button-group" style={{marginTop: '20px'}}>
            <button onClick={fetchCourses} className="btn-primary" disabled={loading}>
              🔄 Refresh Courses
            </button>
            <button onClick={checkBackendHealth} className="btn-secondary" disabled={loading}>
              🏥 Check Backend
            </button>
          </div>

          {courses.length > 0 && (
            <div className="courses-preview">
              <h4>Courses Preview:</h4>
              {courses.map((course) => (
                <div key={course.id} className="course-preview-item">
                  <strong>{course.code}</strong>: {course.name}
                  <br />
                  <small>Difficulty: {course.avgDifficulty?.toFixed(1) || 'N/A'} | Time: {course.avgTimeCommitment?.toFixed(1) || 'N/A'}</small>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* API Response Section */}
        <div className="debug-section card">
          <h2>🔍 Last API Response</h2>
          {apiResponse ? (
            <pre className="api-response">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          ) : (
            <p>No API response yet. Click "Refresh Courses" or "Check Backend".</p>
          )}
        </div>

        {/* System Info */}
        <div className="debug-section card">
          <h2>ℹ️ System Information</h2>
          <div className="system-info">
            <p><strong>Frontend URL:</strong> {window.location.origin}</p>
            <p><strong>Backend URL:</strong> http://localhost:8080/api</p>
            <p><strong>Current Path:</strong> {window.location.pathname}</p>
            <p><strong>LocalStorage Token:</strong> {localStorage.getItem('token') ? '✅ Present' : '❌ Missing'}</p>
            <p><strong>Browser:</strong> {navigator.userAgent}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="debug-section card">
          <h2>⚡ Quick Actions</h2>
          <div className="button-group">
            <button onClick={() => window.location.href = '/'} className="btn-secondary">
              🏠 Go Home
            </button>
            <button onClick={() => window.location.href = '/login'} className="btn-primary">
              🔐 Go to Login
            </button>
            <button onClick={() => window.location.href = '/register'} className="btn-success">
              ✍️ Go to Register
            </button>
            {isAdmin() && (
              <button onClick={() => window.location.href = '/admin'} className="btn-primary">
                👑 Go to Admin
              </button>
            )}
            <button 
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }} 
              className="btn-danger"
            >
              🗑️ Clear Storage & Reload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
