const http = require('http')

const PORT = 3001

const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method

  // En-têtes communs à toutes les réponses
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (method === 'GET' && url === '/') {
    res.writeHead(200)
    res.end(JSON.stringify({ message: 'Bienvenue sur DevHub API' }))
    return
  }

  if (method === 'GET' && url === '/api/posts') {
    const posts = [
      { id: 1, title: 'Apprendre Node.js', author: 'Hamid' },
      { id: 2, title: 'React de zéro', author: 'Hamid' },
    ]
    res.writeHead(200)
    res.end(JSON.stringify(posts))
    return
  }

  // Route inconnue → 404
  res.writeHead(404)
  res.end(JSON.stringify({ error: 'Route introuvable' }))
})

server.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
})
