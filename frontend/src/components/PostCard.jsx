import { Link } from 'react-router-dom'

function PostCard({ post, onDelete, onEdit }) {
  return (
    <div className="post-card">
      <div className="post-card-header">
        <span className="post-author">{post.author}</span>
      </div>
      <Link to={`/posts/${post._id}`} className="post-title">
        {post.title}
      </Link>
      <div className="post-actions">
        <button className="btn-edit" onClick={() => onEdit(post)}>
          Modifier
        </button>
        <button className="btn-delete" onClick={() => onDelete(post._id)}>
          Supprimer
        </button>
      </div>
    </div>
  )
}

export default PostCard
