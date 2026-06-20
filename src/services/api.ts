const API_URL = import.meta.env.VITE_API_URL

export const createAppointment = async (appointment: { professional_id: number; patient_id: number; start_time: string; end_time: string; notes: string }) => {
    const response = await fetch(
        `${API_URL}/appointments/schedule-appointment`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
        }
    )

    if (!response.ok) {
        throw new Error('Error al crear cita')
    }

    const data = await response.json()
    return data
}