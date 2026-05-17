require('dotenv').config()
const express = require('express');
const connectDB = require('./db')
const postsRouter = require('./routes/posts.routes')
const app= express()
const PORT = process.env.PORT || 3001
const authRouter = require('./routes/auth.routes')
const commentsRouter = require("./routes/comments.routes")
const userRouter = require('./routes/users.routes')
app.use(express.json())
app.use((req , res , next)=> {

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' , 'OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if(req.method === 'OPTIONS'){
    return res.sendStatus(200)
  }
  next()
})

app.use('/api/posts' , postsRouter)
app.use('/api/auth' , authRouter)
app.use('/api/posts/:postId/comments' , commentsRouter)
app.use('/api/users', userRouter)

connectDB().then(()=> {
  app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
  })
})