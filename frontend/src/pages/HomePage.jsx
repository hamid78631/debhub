import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_URL + '/posts'

function HomePage() {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [postAModifier, setPostAModifier] = useState(null)
  const [tagActif, setTagActif] = useState(null)
  const [search , setSearch] = useState('')
  const { token, user } = useAuth()

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [])

  function handleCreate(post) {
    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(newPost => {
        setPosts([...posts, newPost])
        setShowForm(false)
      })
  }

  function handleUpdate(post) {
    fetch(`${API}/${postAModifier._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(updatedPost => {
        setPosts(posts.map(p => p._id === updatedPost._id ? updatedPost : p))
        setPostAModifier(null)
        setShowForm(false)
      })
  }

  function handleDelete(id) {
    fetch(`${API}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) return
        setPosts(posts.filter(p => p._id !== id))
      })
  }

  function handleEdit(post) {
    setPostAModifier(post)
    setShowForm(true)
  }

  function handleCancel() {
    setPostAModifier(null)
    setShowForm(false)
  }

  function handleSubmit(data) {
    if (postAModifier) {
      handleUpdate(data)
    } else {
      handleCreate(data)
    }
  }

  
  const tags = [...new Set(posts.flatMap(p => p.tags || []))]

  
  const postsFiltres = posts
    .filter(p => !tagActif || (p.tags && p.tags.includes(tagActif)))
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div className='post-header'>
        <input type="text" 
        className='search-input'
        placeholder='Recherche un post'
        value={search}
        onChange={ (e)=> setSearch(e.target.value)}
        />
        {user && (
          <button className="btn-new" onClick={() => setShowForm(true)}>
            + Nouveau post
          </button>
        )}
      </div>

      {tags.length > 0 && (
        <div className="tags-filter">
          <button
            className={!tagActif ? 'tag active' : 'tag'}
            onClick={() => setTagActif(null)}
          >
            Tous
          </button>
          {tags.map(tag => (
            <button
              key={tag}
              className={tagActif === tag ? 'tag active' : 'tag'}
              onClick={() => setTagActif(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <main className="posts-grid">
        {postsFiltres.map(post => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </main>

      {showForm && (
        <PostForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          postAModifier={postAModifier}
        />
      )}
    </>
  )
}

export default HomePage