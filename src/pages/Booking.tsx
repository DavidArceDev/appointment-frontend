import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

import '../styles/booking.css'

import {
    getSpecialties,
    getProfessionalsBySpecialty,
} from '../services/booking.service'

type Option = {
    value: number
    label: string
}

export default function Booking() {

    const navigate = useNavigate()

    const [specialties, setSpecialties] =
        useState<Option[]>([])

    const [professionals, setProfessionals] =
        useState<Option[]>([])

    const [selectedSpecialty,
        setSelectedSpecialty] =
        useState<Option | null>(null)

    const [selectedProfessional,
        setSelectedProfessional] =
        useState<Option | null>(null)

    useEffect(() => {

        loadSpecialties()

    }, [])

    const loadSpecialties =
        async () => {

            try {

                const result =
                    await getSpecialties()

                setSpecialties(
                    result.map((s: { specialty_id: number, specialty_name: string }) => ({
                        value: s.specialty_id,
                        label: s.specialty_name,
                    }))
                )

            } catch (error) {

                console.error(error)

            }
        }

    const handleSpecialtyChange =
        async (
            option: Option | null
        ) => {

            setSelectedSpecialty(option)

            setSelectedProfessional(null)

            setProfessionals([])

            if (!option) return

            try {

                const result =
                    await getProfessionalsBySpecialty(
                        option.value
                    )



                setProfessionals(result)

            } catch (error) {

                console.error(error)

            }
        }

    const handleContinue = () => {

        if (!selectedProfessional) return

        navigate(
            `/calendar/${selectedProfessional.value}`
        )
    }

    return (
        <div className="booking-container">

            <h1>
                Reservar Hora
            </h1>

            <div className="booking-card">

                <label>
                    Especialidad
                </label>

                <Select
                    options={specialties}
                    value={selectedSpecialty}
                    onChange={handleSpecialtyChange}
                    placeholder="Seleccione especialidad"
                    isClearable
                />

                <label
                    style={{
                        marginTop: '20px'
                    }}
                >
                    Profesional
                </label>

                <Select
                    options={professionals}
                    value={selectedProfessional}
                    onChange={(option) =>
                        setSelectedProfessional(option)
                    }
                    placeholder="Seleccione profesional"
                    isDisabled={!selectedSpecialty}
                    isClearable
                />

                <button
                    onClick={handleContinue}
                    disabled={!selectedProfessional}
                >
                    Ver Horarios
                </button>

            </div>

        </div>
    )
}