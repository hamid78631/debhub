import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import {useAuth} from '../context/AuthContext'


const API = "http://localhost:3001/api/posts"
function HomePage() {
  const [posts, setPosts] = useState([])
  const [showForm , setShowForm] = useState(false)
  const [postAModifier , setPostAModifier] = useState(null)
 
  const { token, user } = useAuth()

  useEffect(() => {
    fetch(API)
    .then(res => res.json())
    .then(data => setPosts(data))
  }, [])

  function handleCreate(post){
    fetch(API , {
      method : 'POST', 
      headers : { 'content-type' : 'application/json',
        'Authorization' : `Bearer ${token}`
       },
      body : JSON.stringify(post)
    })
    .then(res =>res.json())
    .then(newPost => {
      setPosts([...posts , newPost])
      setShowForm(false)
    })
  }

  function handleUpdate(post){
    fetch(`${API}/${postAModifier._id}`, {
      method : 'PUT', 
      headers : { 'content-type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      } , 
      body : JSON.stringify(post)
    })
    .then(res => res.json())
    .then(updatedPost => {
      setPosts(posts.map(p => p._id === updatedPost._id ? updatedPost : p))
      setPostAModifier(null)
      setShowForm(false)
    })

  }
  function handleDelete(id){
    fetch(`${API}/${id}`, {
      method : 'DELETE', 
      headers : { 'Authorization' : `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) return
      setPosts(posts.filter(p => p._id !== id))
    })
  }

  function handleEdit(post){
    setPostAModifier(post)
    setShowForm(true)
  }
  function handleCancel(){
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


 return (
  <>
  <div className='post-header'>
    {user && (
      <button className="btn-new" onClick={() => setShowForm(true)}>
        + Nouveau post
      </button>
    )}
  </div>
    <main className="posts-grid">
      {posts.map((post) => (
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
