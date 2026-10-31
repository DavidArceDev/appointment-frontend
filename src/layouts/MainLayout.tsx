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
            confirmButtonColor: '#A8B5A0',
            cancelButtonColor: '#C98F78',
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
                    {/* Aquí podría dejar un mensaje?, también una imágen, incluso el logo de la app cuando lo tenga. */}
                    Bienvenido a tu espacio de bienestar
                </div>

                <div className="user-info">

                    <span>
                        {`Bienvenido ${patient?.name?.charAt(0).toUpperCase() + patient?.name?.slice(1)}`}
                    </span>

                    <br />

                    <button style={{ backgroundColor: '#C98F78' }} onClick={handleLogout}>
                        Cerrar sesión
                    </button>

                </div>

            </header>

            <Outlet />
        </>
    )
}