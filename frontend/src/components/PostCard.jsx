function PostCard({post, onDelete , onEdit}) {

    return(
        <div className="post-card">
            <div className="post-card-header">
                <span className="post-author"> 
                    {post.author}
                </span>
            </div>

            <h2 className="post-title">
                {post.title}
            </h2>
            <div className="post-actions">
                <button className="btn-edit" onClick={() => {onEdit(post)}}>
                    Modifier
                </button>
                <button className="btn-delete" onClick={() => {onDelete(post.id)}}>
                    Supprimer
                </button>
            </div>
        </div>
    )
}

export default PostCard