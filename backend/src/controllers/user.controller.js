const User = require('../models/User')
const Post = require('../models/Posts')

async function getProfile(req, res){
    const user = await User.findOne({username : req.params.username}).select('-password')
    if(!user) return res.status(404).json({error : 'User non trouvé'})

    const posts = await Post.find({ author : user.username})
    const totalLikes = posts.reduce((sum, post) => sum + post.likes.length, 0)

    res.json({ user, posts, totalLikes })
}

module.exports = {getProfile}