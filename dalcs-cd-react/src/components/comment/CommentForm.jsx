import { useState } from 'react';
import { commentApi } from '../../api/commentApi';
import './CommentForm.css';

export default function CommentForm({ courseId, onSuccess }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await commentApi.create(courseId, { text });
      setText('');
      onSuccess();
    } catch (err) {
      setError('Failed to submit comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-form card">
      <h3>Add a Comment</h3>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts about this course..."
          rows="4"
        />
        
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </div>
  );
}
