const express = require('express')
const router= express.Router()
const { getAllPosts , getOne , createPost , updatePost , removePost } = require('../controllers/posts.controller')

router.get('/' , getAllPosts)
router.get('/:id' , getOne)
router.post('/' , createPost)
router.put('/:id' , updatePost)
router.delete('/:id' , removePost)

module.exports = router