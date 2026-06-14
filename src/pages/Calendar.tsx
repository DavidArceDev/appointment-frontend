import AppointmentCalendar from '../components/AppointmentCalendar'
import { CalendarDays } from "lucide-react"

export default function Calendar() {
  return (
    <div style={{ width: '1200px', margin: '0 auto' }}>

      <header style={{
        width: '100%',
        background: '#0d3b66',
        color: 'white',
        textAlign: 'center',
        padding: '10px 0',
        fontWeight: '500'
      }}>
        Clínica Mañochilla — Agenda en línea
      </header>

      <h1 style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}>
        <CalendarDays color="#4cbfa6" size={32} />
        Horarios disponibles
      </h1>

      <AppointmentCalendar />

    </div>
  )
}