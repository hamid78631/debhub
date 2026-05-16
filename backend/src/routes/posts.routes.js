const express = require('express')
const router= express.Router()
const { getAllPosts , getOne , createPost , updatePost , removePost, toggleLike } = require('../controllers/posts.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/' , getAllPosts)
router.get('/:id' , getOne)
router.post('/' ,authMiddleware, createPost)
router.put('/:id' , authMiddleware, updatePost)
router.delete('/:id' , authMiddleware, removePost)

router.post('/:id/like' , authMiddleware, toggleLike)
module.exports = router