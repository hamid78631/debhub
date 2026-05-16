import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const API = 'http://localhost:3001/api/auth'

function RegisterPage(){

    const[email , setEmail] = useState('')
    const [username , setUsername ] = useState('')
    const [password , setPassword] = useState('')
    const {login} = useAuth()
    const navigate = useNavigate()
    const [error , setError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await fetch(`${API}/register`, {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            }, 
            body : JSON.stringify({email , username , password})

        })
        const data = await res.json()
        if(!res.ok) {
            return setError(data.error || 'Une erreur est survenue')
        }
        login(data.token , {username : data.username})
        navigate('/')
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Créer un compte</h2>
                {error && <p className="auth-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    required/>
                    <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} required/>
                    <button type="submit">S'inscrire</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage