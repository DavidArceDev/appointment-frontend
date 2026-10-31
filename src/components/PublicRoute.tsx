import { Navigate } from 'react-router-dom'
import { type ReactNode } from 'react'

export default function PublicRoute({
    children,
}: {
    children: ReactNode
}) {

    const token = localStorage.getItem('token')

    // no está logeado redirige a dashboard paciente
    if (token) {
        return <Navigate to="/dashboard" />
    }

    return <>{children}</>
}