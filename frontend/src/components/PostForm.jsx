import { useEffect, useState } from "react"

function PostForm({ onSubmit, onCancel, postAModifier }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')

    useEffect(() => {
        if (postAModifier) {
            setTitle(postAModifier.title)
            setAuthor(postAModifier.author)
            setContent(postAModifier.content || '')
            setTags((postAModifier.tags || []).join(', '))
        } else {
            setTitle('')
            setAuthor('')
            setContent('')
            setTags('')
        }
    }, [postAModifier])

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit({
            title,
            author,
            content,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean)
        })
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{postAModifier ? "Modifier le post" : "Créer un post"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Auteur"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Contenu du post"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Tags (ex: javascript, react)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <div className="modal-actions">
                        <button type="button" onClick={onCancel}>Annuler</button>
                        <button type="submit">
                            {postAModifier ? "Modifier" : "Créer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm
