const express = require('express');
const {getPosts , ecrirePosts} = require('./posts')

const app= express()
const PORT = 3001

app.use(express.json())
app.use((req , res , next)=> {

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})


//read all
app.get('/api/posts', (req , res) => {
  const posts = getPosts()
  res.json(posts)
})

//read one 
app.get('/api/posts/:id', (req , res) => {
  const posts = getPosts()
  const post = posts.find(p=> p.id === parseInt(req.params.id))
  if (!post) {
    res.status(404).json({ error: 'Post non trouvé' })
    return
  }
  res.json(post)
})

//Create 

app.post('/api/posts' , (req , res) => {
  const posts = getPosts()
  const newPost = {
    id : Date.now(),
    title : req.body.title , 
    author : req.body.author 
  }
  posts.push(newPost)

  ecrirePosts(posts)
  res.status(201).json(newPost)
})

//update 
app.put('/api/posts/:id' , (req , res ) => {
  const posts = getPosts()
  const index = posts.findIndex(p => p.id === parseInt(req.params.id))
   if(index === -1){
    return res.status(404).json({error : "Post non trouvé"})
   }
  
   posts[index] = {
   ...posts[index], ...req.body 
   }
   ecrirePosts(posts)
   res.json(posts[index])
})

//delete 
app.delete('/api/posts/:id' , (req , res) => {
  const posts = getPosts()
  const index = posts.findIndex(p => p.id === parseInt(req.params.id))
  if(index === -1){
    return res.status(404).json({error : "Post non trouvé"})
  }
  const deletedPosts = posts.splice(index , 1)
  ecrirePosts(posts)
  res.json(deletedPosts[0])
})

app.listen(PORT , ()=> {
  console.log(`Server is running on port ${PORT}`)
})
