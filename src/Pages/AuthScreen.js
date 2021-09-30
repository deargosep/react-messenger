import React from 'react'
import { useRecoilState } from 'recoil'
import { auth } from '../Firebase'
import {user_state} from '../user'
export default function AuthScreen() {
    const [form, setForm] = React.useState(true)
    return (
        <div>
            {
                form ? <Login /> : <Register />
            }
            <button onClick={() => { setForm(form => !form) }}>{form ? 'Register' : 'Authenticate'}</button>
        </div>
    )
}

function Login() {
    const [error, setError] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [user, setUser] = useRecoilState(user_state)
    let authenticate = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch((err) => setError(err.message)).then(()=>setError(''))
    }
    return (
        <div>
            <h1>Authentication</h1>
            {error &&
                <div style={styles.error}>
                    <span style={styles.errorText}>{error}</span>
                </div>
            }
            <form onSubmit={authenticate} style={styles.form}>
                <input required type="email" onChange={(text) => setEmail(text.target.value)} placeholder="E-Mail" />
                <input minLength={8} required type="password" onChange={(text) => setPassword(text.target.value)} placeholder="Password" />
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}

function Register() {
    const [error, setError] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [user, setUser] = useRecoilState(user_state)
    const [password, setPassword] = React.useState('')
    const [retryPassword, setRetryPassword] = React.useState('')
    let register = (event) => {
        event.preventDefault();
        if (password === retryPassword) auth.createUserWithEmailAndPassword(email, password).catch((err) => setError(err.message)).then(()=>setError(''))
    }
    return (
        <div>
            <h1>Registration</h1>
            {
                error &&
                <div style={styles.error}>
                    <span style={styles.errorText}>{error}</span>
                </div>
            }
            <form onSubmit={register} style={styles.form}>
                <input required type="email" value={email} onChange={(text) => setEmail(text.target.value)} placeholder="E-Mail" />
                <input minLength={8} required type="password" value={password} onChange={(text) => setPassword(text.target.value)} placeholder="Password" />
                <input minLength={8} required type="password" value={retryPassword} onChange={(text) => setRetryPassword(text.target.value)} placeholder="Retry Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

const styles = {
    container: {
        padding: 26,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    error: {
        display: 'flex',
        borderRadius: 2,
        height: 45,
        backgroundColor: 'red',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        color: 'white'
    }
}