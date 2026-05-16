const Comment = require('../models/Comment')

async function getComments( req , res){
const comments = await Comment.find({postId : req.params.postId})
res.json(comments)

}

async function createComment(req , res){

    const comment = await Comment.create({
        body : req.body.body ,
        author : req.user.username ,
        postId : req.params.postId
    })
    res.status(201).json(comment)
    }

async function deleteComment(req, res) {
  const comment = await Comment.findById(req.params.commentId)
  if (!comment) return res.status(404).json({ error: 'Commentaire non trouvé' })
  if (comment.author !== req.user.username) return res.status(403).json({ error: 'Non autorisé' })
  await comment.deleteOne()
  res.json({ message: 'Commentaire supprimé' })
}

    module.exports = { getComments , createComment , deleteComment }