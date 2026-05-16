const express = require('express')
const router = express.Router({ mergeParams: true })
const { getComments, createComment, deleteComment } = require('../controllers/comment')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', getComments)
router.post('/', authMiddleware, createComment)
router.delete('/:commentId', authMiddleware, deleteComment)

module.exports = router