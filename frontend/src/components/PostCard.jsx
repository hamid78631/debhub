import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const API = 'http://localhost:3001/api'

function PostCard({ post, onDelete, onEdit }) {
  const { user, token } = useAuth()
  const [likes, setLikes] = useState(post.likes || [])

  function handleLike() {
    fetch(`${API}/posts/${post._id}/like`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(updatedPost => setLikes(updatedPost.likes))
  }

  const alreadyLiked = user && likes.includes(user.userId)

  return (
    <div className="post-card">
      <div className="post-card-header">
        <Link to={`/profile/${post.author}`} className="post-author">{post.author}</Link>
      </div>
      <Link to={`/posts/${post._id}`} className="post-title">
        {post.title}
      </Link>
      {post.tags && post.tags.length > 0 && (
  <div className="post-tags">
    {post.tags.map(tag => (
      <span key={tag} className="tag">#{tag}</span>
    ))}
  </div>
)}

      <div className="post-footer">
        <button
          className={`btn-like ${alreadyLiked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={!user}
        >
          ♥ {likes.length}
        </button>
        {user && (
          <div className="post-actions">
            <button className="btn-edit" onClick={() => onEdit(post)}>Modifier</button>
            <button className="btn-delete" onClick={() => onDelete(post._id)}>Supprimer</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard
