const API_URL = import.meta.env.VITE_API_URL

export const createAppointment = async (appointment: any) => {
  const response = await fetch(
    `${API_URL}/appointments`,
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

  return response.json()
}