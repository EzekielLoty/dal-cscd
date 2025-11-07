import './RatingDisplay.css';

export default function RatingDisplay({ avgDifficulty, avgTimeCommitment }) {
  return (
    <div className="rating-display card">
      <h3>Average Ratings</h3>
      <div className="ratings-grid">
        <div className="rating-box">
          <div className="rating-label">Difficulty</div>
          <div className="rating-score">
            {avgDifficulty ? avgDifficulty.toFixed(1) : 'N/A'}
          </div>
          <div className="rating-scale">out of 5</div>
        </div>
        <div className="rating-box">
          <div className="rating-label">Time Commitment</div>
          <div className="rating-score">
            {avgTimeCommitment ? avgTimeCommitment.toFixed(1) : 'N/A'}
          </div>
          <div className="rating-scale">out of 5</div>
        </div>
      </div>
    </div>
  );
}
