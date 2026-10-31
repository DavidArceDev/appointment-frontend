import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'
import {
    CalendarPlus,
    ClipboardList,
    UserRound
} from 'lucide-react'
import Swal from 'sweetalert2'

export default function Dashboard() {

    const navigate = useNavigate()

    return (
        <div className="dashboard-container">

            <h1>¿Qué deseas hacer?</h1>

            <div className="dashboard-grid">

                <div
                    className="dashboard-card"
                    onClick={() => navigate('/booking')}
                >
                    <CalendarPlus size={40} />
                    <h3>Reservar Hora</h3>
                    <p>
                        Agenda una nueva atención
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    // onClick={() => navigate('/my-appointments')}
                    onClick={() => Swal.fire({
                        title: 'Funcionalidad en desarrollo',
                        text: 'Esta funcionalidad estará disponible próximamente.',
                    })}
                >
                    <ClipboardList size={40} />
                    <h3>Mis Reservas</h3>
                    <p>
                        Revisa tus horas agendadas
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    // onClick={() => navigate('/profile')}
                    onClick={() => Swal.fire({
                        title: 'Funcionalidad en desarrollo',
                        text: 'Esta funcionalidad estará disponible próximamente.',
                    })}
                >
                    <UserRound size={40} />
                    <h3>Mis Datos</h3>
                    <p>
                        Actualiza tu información
                    </p>
                </div>

            </div>

        </div >
    )
}