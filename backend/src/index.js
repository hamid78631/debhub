require('dotenv').config()
const express = require('express');
const connectDB = require('./db')
const postsRouter = require('./routes/posts.routes')
const app= express()
const PORT = process.env.PORT || 3001



app.use(express.json())
app.use((req , res , next)=> {

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use('/api/posts' , postsRouter)

connectDB().then(()=> {
  app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
  })
})