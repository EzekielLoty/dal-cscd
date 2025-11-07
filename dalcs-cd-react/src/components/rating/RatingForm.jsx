import { useState } from 'react';
import { ratingApi } from '../../api/ratingApi';
import './RatingForm.css';

export default function RatingForm({ courseId, onSuccess }) {
  const [difficulty, setDifficulty] = useState(3);
  const [timeCommitment, setTimeCommitment] = useState(3);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await ratingApi.addOrUpdate(courseId, { difficulty, timeCommitment });
      onSuccess();
      alert('Rating submitted successfully!');
    } catch (err) {
      setError('Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rating-form card">
      <h3>Rate this course</h3>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="rating-input">
          <label>
            Difficulty: <strong>{difficulty}</strong>/5
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
          />
        </div>
        
        <div className="rating-input">
          <label>
            Time Commitment: <strong>{timeCommitment}</strong>/5
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={timeCommitment}
            onChange={(e) => setTimeCommitment(Number(e.target.value))}
          />
        </div>
        
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Rating'}
        </button>
      </form>
    </div>
  );
}
