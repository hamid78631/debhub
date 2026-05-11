import { useEffect, useState } from "react"

function PostForm( {onSubmit, onCancel , postAModifier}){

    const [ title , setTitle ] = useState("")
    const [ author , setAuthor] = useState("")

    useEffect( () => {
        if(postAModifier){
            setTitle(postAModifier.title)
            setAuthor(postAModifier.author)
        }else {
            setTitle('')
            setAuthor('')
        }
    }, [postAModifier])

    function handleSubmit(e){
        e.preventDefault()
        onSubmit( {title , author})
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{postAModifier ? "Modifier le post" : "Créer un post"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                    type="text" 
                    placeholder="titre"
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                    <input
                    type="text"
                    placeholder="auteur"
                    value = {author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    />

                    <div className="modal-actions">
                        <button type="button" onClick={onCancel}>Annuler</button>
                        <button type='submit' >
                            {postAModifier ? "Modifier" : "Créer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm