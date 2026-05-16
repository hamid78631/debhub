import {useState , useEffect } from 'react'
import {useParams}  from 'react-router-dom'
import {useAuth}  from '../context/AuthContext'

const API = 'http://localhost:3001/api'

function PostDetailPage(){
    const {id } = useParams()
    const [post , setPost] = useState(null)
    const {user , token } = useAuth()
    const[comments , setComments ] = useState([])
    const [body , setBody] = useState('')

    useEffect( () => {
        fetch(`${API}/posts/${id}`)
        .then( res=> res.json())
        .then( data => setPost(data))

        fetch(`${API}/posts/${id}/comments`)
        .then( res => res.json())
        .then( comments => setComments(comments))
    }, [id])

    function handleAddComment( e ){
        e.preventDefault()
        fetch(`${API}/posts/${id}/comments` , {
            method : 'POST', 
            headers : {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${token}`},
            body : JSON.stringify({body}) 
        })
        .then( res => res.json())
        .then( newComment => {
            setComments([...comments , newComment])
            setBody('')
        })
    }

    if(!post) return <p>Chargement ...</p>

    return (
        <div className="post-detail">
            <h1>{post.title}</h1>
            <p className="post-author">{post.author}</p>
            <p className="post-content">{post.content}</p>

            <h2>Commentaire</h2>
            <ul className='comments-lists'>
                {comments.map( comment => (
                    <li key={comment._id}> 
                        <strong>{comment.author}</strong> : {comment.body}
                    </li>
                ))}
            </ul>
            {user && (
                <form className="comment-form" onSubmit={handleAddComment}>
                    <textarea required placeholder="Ton commentaire..." value={body} onChange={(e) => setBody(e.target.value)} />
                    <button type='submit'>Commenter</button>
                </form>
            )}
        </div>
    )
}   

export default PostDetailPage 