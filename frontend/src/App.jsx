import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PostDetailPage from './pages/PostDetailPage'
import './App.css'
import ProfilePage from './pages/ProfilePage'

function App() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">DevHub</Link>
        <nav className="nav">
          {user ? (
            <>
              <span className="nav-user">👋 {user.username}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">Connexion</Link>
              <Link to="/register" className="btn-new">S'inscrire</Link>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
