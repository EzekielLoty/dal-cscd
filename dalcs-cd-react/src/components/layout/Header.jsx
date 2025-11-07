import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="header">
      <nav className="container">
        <div className="nav-content">
          <Link to="/" className="logo">Dal CS|CD</Link>
          
          <div className="nav-links">
            <Link to="/" className="nav-link">Courses</Link>
            {/* <Link to="/debug" className="nav-link debug-link">🔧 Debug</Link> */}
            
            {user ? (
              <>
                {isAdmin() && (
                  <Link to="/admin" className="nav-link">Admin</Link>
                )}
                <span className="user-greeting">Hi, {user.name || user.email}</span>
                <button onClick={logout} className="btn-danger">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register">
                  <button className="btn-success">Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
