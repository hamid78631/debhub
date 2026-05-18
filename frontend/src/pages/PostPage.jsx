import {useState , useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

const API = import.meta.env.VITE_API_URL + '/posts'

function PostPage(){
const {id} = useParams()
const [post , setPost] = useState(null)
const navigate = useNavigate()
const [loading , setLoading] = useState(true)

useEffect( () => {
    
    fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(data => {setPost(data)
    setLoading(false)
    })
} ,[id])


  if (loading) return <p className="page-status">Chargement...</p>
  if (!post || post.error) return <p className="page-status">Post introuvable.</p>

return (
    <div className="post-detail">
        <button className="btn-back" onClick={() => navigate(-1)}> Retour </button>
        <h2 className="post-detail-title">{post.title}</h2>

        <span className='post-author'> {post.author}</span>
    </div>
)


}
export default PostPage