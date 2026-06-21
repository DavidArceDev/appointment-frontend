import { useState } from 'react'
import Swal from 'sweetalert2'
import { login } from '../services/auth.service'
import '../styles/auth.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // VALIDACIÓN VACÍOS
        if (!form.email || !form.password) {
            return Swal.fire({
                icon: 'warning',
                title: 'Completa todos los campos',
            })
        }

        try {
            const result = await login(form)

            localStorage.setItem('token', result.token)
            localStorage.setItem('patient', JSON.stringify(result.patient))

            await Swal.fire({
                icon: 'success',
                title: `Bienvenido ${result.patient.name}`,
            })

            navigate('/dashboard')

        } catch (error: unknown) {
            const msg = (error as Error).message

            // usuario no existe
            if (msg.includes('Credenciales inválidas')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario no encontrado o contraseña incorrecta',
                    showCancelButton: true,
                    confirmButtonText: 'Registrarme',
                    cancelButtonText: 'Cerrar',
                }).then((res) => {
                    if (res.isConfirmed) navigate('/register')
                })

                return
            }

            Swal.fire({
                icon: 'error',
                title: msg,
            })
        }
    }

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <input name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />

                <button type="submit">Ingresar</button>

                <div className="auth-link">
                    ¿No tienes cuenta? <Link to="/register">Registro</Link>
                </div>
            </form>
        </div>
    )
}