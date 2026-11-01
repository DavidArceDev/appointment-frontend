import { useState } from 'react'
import Swal from 'sweetalert2'
import { register } from '../services/auth.service'
import '../styles/auth.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import AuthInput from '../components/AuthInput'
import {
    UserRound,
    Mail,
    LockKeyhole,
    IdCard,
    Phone,
    ShieldCheck
} from 'lucide-react'

export default function Register() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        last_name: '',
        email: '',
        password: '',
        rut: '',
        phone: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // VALIDACIONES VACÍAS
        if (!form.name || !form.last_name || !form.email || !form.password || !form.rut) {
            return Swal.fire({
                icon: 'warning',
                title: 'Completa todos los campos obligatorios',
            })
        }

        // VALIDAR RUT
        if (!validarRUT(form.rut)) {
            return Swal.fire({
                icon: 'error',
                title: 'RUT inválido',
            })
        }

        try {
            await register(form)

            await Swal.fire({
                icon: 'success',
                title: 'Usuario creado',
            })

            navigate('/login')

        } catch (error: unknown) {
            const msg = (error as Error).message

            // usuario ya existe
            if (msg.includes('Email ya registrado')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario ya existe',
                    text: 'Este correo ya está registrado',
                    showCancelButton: true,
                    confirmButtonText: 'Ir a login',
                    cancelButtonText: 'Cerrar',
                }).then((res) => {
                    if (res.isConfirmed) navigate('/login')
                })

                return
            }

            Swal.fire({
                icon: 'error',
                title: msg,
            })
        }
    }

    const validarRUT = (rut: string) => {
        if (!rut) return false

        const clean = rut.replace(/\./g, '').replace('-', '')
        const body = clean.slice(0, -1)
        const dv = clean.slice(-1).toUpperCase()

        let sum = 0
        let multiplier = 2

        for (let i = body.length - 1; i >= 0; i--) {
            sum += parseInt(body[i]) * multiplier
            multiplier = multiplier === 7 ? 2 : multiplier + 1
        }

        const expectedDV = 11 - (sum % 11)

        const dvCalc =
            expectedDV === 11 ? '0'
                : expectedDV === 10 ? 'K'
                    : expectedDV.toString()

        return dvCalc === dv
    }

    const formatRut = (value: string) => {
        // dejar solo numeros y k
        const clean = value.replace(/[^0-9kK]/g, '').toUpperCase()

        // separar cuerpo y dv
        if (clean.length <= 1) return clean

        const body = clean.slice(0, -1)
        const dv = clean.slice(-1)

        return `${body}-${dv}`
    }

    const sanitizeRut = (value: string) => {
        return value
            .replace(/\./g, '')
            .replace(/[^0-9kK-]/g, '')
            .toUpperCase()
    }

    return (
        <AuthLayout>
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1>Crear cuenta</h1>
                <p>Ingresa tus datos para comenzar</p>

                <AuthInput
                    icon={UserRound}
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <AuthInput
                    icon={UserRound}
                    name="last_name"
                    placeholder="Apellidos"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                />

                <AuthInput
                    icon={Mail}
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <AuthInput
                    icon={LockKeyhole}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <AuthInput
                    icon={IdCard}
                    name="rut"
                    placeholder="RUT (12345678-9)"
                    value={form.rut}
                    onChange={(e) => {
                        const cleaned = sanitizeRut(e.target.value)
                        setForm({ ...form, rut: formatRut(cleaned) })
                    }}
                    maxLength={10}
                    autoComplete="off"
                    required
                />

                <AuthInput
                    icon={Phone}
                    type="tel"
                    name="phone"
                    placeholder="Teléfono (opcional)"
                    value={form.phone}
                    onChange={handleChange}
                />

                <button type="submit">Ingresar</button>

                <div className="auth-link">
                    ¿Ya tienes cuenta?
                </div>

                <div className="auth-secondary-link">
                    <Link to="/login">Iniciar sesión</Link>
                </div>

                <div className="auth-security">
                    <ShieldCheck size={17} strokeWidth={1.8} />
                    <span>Tus datos están protegidos y son confidenciales.</span>
                </div>
            </form>
        </AuthLayout>
    )

}