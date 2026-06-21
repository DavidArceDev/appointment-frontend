const API_URL = `${import.meta.env.VITE_API_URL}/booking`

export const getSpecialties = async () => {
    const response = await fetch(`${API_URL}/specialties`)

    if (!response.ok) {
        throw new Error(
            'Error obteniendo especialidades'
        )
    }

    return response.json()
}

export const getProfessionalsBySpecialty = async (specialtyId: number) => {

    const response = await fetch(`${API_URL}/professionals/specialty/${specialtyId}`
    )

    if (!response.ok) {
        throw new Error(
            'Error obteniendo profesionales'
        )
    }

    return response.json()
}