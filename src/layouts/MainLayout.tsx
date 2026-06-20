import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { logout, getCurrentUser } from '../utils/auth'
import '../styles/layout.css'
import Swal from 'sweetalert2'

export default function MainLayout() {

    const navigate = useNavigate()
    const patient = getCurrentUser()
    const handleLogout = () => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Quieres cerrar sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
                navigate('/')
            }
        })
    }

    return (
        <>
            <header className="main-header">

                <div className="system-name">
                    Agendamiento de Pacientes
                </div>

                <div className="user-info">

                    <span>
                        Bienvenido {patient?.name?.toUpperCase()}
                    </span>

                    <br />

                    <button onClick={handleLogout}>
                        Cerrar sesión
                    </button>

                </div>

            </header>

            <Outlet />
        </>
    )
}