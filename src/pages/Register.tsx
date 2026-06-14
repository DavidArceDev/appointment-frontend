import { useState } from 'react'
import Swal from 'sweetalert2'
import { register } from '../services/auth.service'
import '../styles/auth.css'
import { Link, useNavigate } from 'react-router-dom'

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

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
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

        } catch (error) {
        const msg = error.message

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

    const validarRUT = (rut) => {
        if (!rut) return false

        const clean = rut.replace(/\./g, '').replace('-', '')
        const body = clean.slice(0, -1)
        let dv = clean.slice(-1).toUpperCase()

        let sum = 0
        let multiplier = 2

        for (let i = body.length - 1; i >= 0; i--) {
            sum += parseInt(body[i]) * multiplier
            multiplier = multiplier === 7 ? 2 : multiplier + 1
        }

        const expectedDV = 11 - (sum % 11)

        let dvCalc =
            expectedDV === 11 ? '0'
            : expectedDV === 10 ? 'K'
            : expectedDV.toString()

        return dvCalc === dv
    }

    const formatRut = (value) => {
        // dejar solo numeros y k
        let clean = value.replace(/[^0-9kK]/g, '').toUpperCase()

        // separar cuerpo y dv
        if (clean.length <= 1) return clean

        const body = clean.slice(0, -1)
        const dv = clean.slice(-1)

        return `${body}-${dv}`
    }

    const sanitizeRut = (value) => {
        return value
            .replace(/\./g, '')
            .replace(/[^0-9kK-]/g, '')
            .toUpperCase()
    }

    return (
    <div className="auth-container">
        <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Registro</h2>

        <input name="name" placeholder="Nombre *" onChange={handleChange} />
        <input name="last_name" placeholder="Apellido *" onChange={handleChange} />
        <input name="email" placeholder="Email *" onChange={handleChange} />
        <input type="password" name="password" placeholder="Contraseña *" onChange={handleChange} />

        <input
            name="rut"
            placeholder="RUT (12345678-9)"
            value={form.rut}
            onChange={(e) => {
            const cleaned = sanitizeRut(e.target.value)

            setForm({
                ...form,
                rut: formatRut(cleaned),
            })
            }}
            maxLength={10}
            // placeholder="12345678-9 o 12345678-K"
            autoComplete="off"
            inputMode="text"
        />
        <input name="phone" placeholder="Teléfono (opcional)" onChange={handleChange} />

        <button type="submit">Registrarse</button>

        <div className="auth-link">
            ¿Ya tienes cuenta? <Link to="/login">Login</Link>
        </div>
        </form>
    </div>
    )

}