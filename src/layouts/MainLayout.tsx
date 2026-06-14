import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { logout, getCurrentUser } from '../utils/auth'

export default function MainLayout() {

    const navigate = useNavigate()
    const patient = getCurrentUser()
    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <>
            <header>

                <span>
                    Bienvenido {patient?.name}
                </span>

                <button
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </button>

            </header>

        <Outlet />
        </>
    )
}