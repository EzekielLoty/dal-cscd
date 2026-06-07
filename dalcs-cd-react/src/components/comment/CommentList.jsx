import './CommentList.css';

export default function CommentList({ comments }) {
  if (comments.length === 0) {
    return <p className="no-comments">No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item card">
          <div className="comment-header">
            <span className="comment-author">{comment.userName || 'Anonymous'}</span>
            <span className="comment-date">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
            
          </div>
          <p className="comment-text">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
