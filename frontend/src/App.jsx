import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>DevHub</h1>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostPage />} />
      </Routes>
    </div>
  )
}

export default App
