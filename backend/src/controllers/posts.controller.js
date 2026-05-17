const Post = require('../models/Posts')

async function getAllPosts( req , res){
    const posts = await Post.find()
    res.json(posts)

}

 async function getOne(req , res){
    const post = await Post.findById(req.params.id)
    if(!post){
    return res.status(404).json({error : "Post non trouvé"})
    }
    res.json(post)
}
async function createPost(req, res){
    const post = await Post.create({
        title : req.body.title , 
        author : req.body.author,
        content : req.body.content, 
        tags : req.body.tags || []
    })
    res.status(201).json(post)
}

async function updatePost(req , res){
    const post = await Post.findByIdAndUpdate(
        req.params.id , 
        {title : req.body.title , author : req.body.author , content : req.body.content , tags : req.body.tags || []},
        {new : true})
        if(!post){
            return res.status(404).json({error : "Post non trouvé"})
        }
    res.json(post)
}

async function removePost(req, res){
    const post = await Post.findByIdAndDelete(req.params.id)
    if(!post){
        return res.status(404).json({error : "Post non trouvé"})
    }
    res.json({message : "Post supprimé avec succès "})
}

async function toggleLike( req , res){
    const post = await Post.findById(req.params.id)
    if(!post) return res.status(404).json({error : "Post non trouvé!"})

    const userId = req.user.userId
    const alreadyLiked = post.likes.includes(userId)

    if(alreadyLiked ){
        post.likes = post.likes.filter( id => id.toString() !== userId)
    }else {
        post.likes.push(userId)
    }

    await post.save()
    res.json(post)

}

module.exports = { getAllPosts , getOne , createPost , updatePost , removePost , toggleLike }