import { useState } from 'react'
import Swal from 'sweetalert2'
import { login } from '../services/auth.service'
import '../styles/auth.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

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
                    cancelButtonText: 'Volver a intentar',
                    confirmButtonColor: '#A8B5A0',
                    cancelButtonColor: '#C98F78',
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
        <AuthLayout>
            <form className="auth-card" onSubmit={handleSubmit}>
                <h2>Iniciar sesión</h2>
                <p>Bienvenido de vuelta</p>

                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Iniciar sesión</button>

                <div className="auth-link">
                    ¿Aún no tienes cuenta? <Link to="/register">Crear cuenta</Link>
                </div>
            </form>
        </AuthLayout>
    )
}