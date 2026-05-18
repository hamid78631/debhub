import {useState} from 'react'
import {useNavigate , Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_URL + '/auth'

function LoginPage(){
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const {login} = useAuth()
    const navigate = useNavigate()
    const [error , setError] = useState(null)

    
    async function handleSubmit(e) {
        e.preventDefault()
        const res = await fetch(`${API}/login`, {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            } , 
            body : JSON.stringify({email , password})
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
                <h2>Connexion</h2>
                {error && <p className="auth-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="email"
                    placeholder = 'Email'
                    value = {email}
                    onChange = { (e) => setEmail(e.target.value)}
                    />
                    <input type="password"
                    placeholder = 'Mot de passe'
                    value = {password}
                    onChange = { (e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Se connecter</button>
                </form>
                 <p className="auth-link">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </p>
            </div>
        </div>
    )
}


export default LoginPage