import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL

function ProfilePage() {
  const { username } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`${API}/users/${username}`)
      .then(res => res.json())
      .then(setData)
  }, [username])

  if (!data) return <p>Chargement...</p>

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">{data.user.username[0].toUpperCase()}</div>
        <h1>{data.user.username}</h1>
        <p className="profile-stats">{data.posts.length} posts · {data.totalLikes} likes reçus</p>
      </div>

      <div className="profile-posts">
        <h2>Posts de {data.user.username}</h2>
        {data.posts.map(post => (
          <div key={post._id} className="profile-post-item">
            <a href={`/posts/${post._id}`}>{post.title}</a>
            <span>♥ {post.likes.length}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfilePage