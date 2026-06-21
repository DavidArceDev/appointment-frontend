import AppointmentCalendar from '../components/AppointmentCalendar'
import { CalendarDays } from "lucide-react"
import { useParams } from 'react-router-dom'

export default function Calendar() {

    const { professionalId } = useParams()

    return (
        <div style={{ width: '1200px', margin: '0 auto' }}>

            <h1 style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
            }}>
                <CalendarDays color="#4cbfa6" size={32} />
                Horarios disponibles
            </h1>

            <AppointmentCalendar
                professionalId={Number(professionalId)}
            />

        </div>
    )
}