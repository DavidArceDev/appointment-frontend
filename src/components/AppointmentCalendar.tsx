import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import Swal from 'sweetalert2'
import '../styles/calendar.css'
import { createAppointment } from '../services/api'
import type { DateSelectArg, EventClickArg } from '@fullcalendar/core'

type Props = {
    professionalId: number
}

type CalendarEvent = {
    title: string
    start: string
    end: string
    backgroundColor: string
    borderColor: string
}

type AvailabilitySlot = {
    is_available: boolean
    start_time: string
    end_time: string
}

export default function AppointmentCalendar({ professionalId }: Props) {

    useEffect(() => {
        if (!professionalId) return

        loadAvailability()
    }, [professionalId])

    const [selectedRange, setSelectedRange] = useState<DateSelectArg | null>(null)

    const [availability, setAvailability] = useState<AvailabilitySlot[]>([])

    const patient = JSON.parse(localStorage.getItem('patient') || '{}')

    console.log('patient:', patient)

    const closeModal = () => setSelectedRange(null)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal()
        }

        window.addEventListener('keydown', onKey)

        return () =>
            window.removeEventListener('keydown', onKey)
    }, [])

    const [events, setEvents] = useState<CalendarEvent[]>([])

    const handleConfirm = async () => {

        const range = selectedRange

        if (!range) return

        setSelectedRange(null)

        const result = await Swal.fire({
            title: '¿Confirmar cita?',
            text: 'Se registrará la reserva en el sistema.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, reservar',
            cancelButtonText: 'Cancelar',
        })

        if (!result.isConfirmed) return

        try {

            const appointment = await createAppointment({
                professional_id: professionalId,
                patient_id: patient.id,
                start_time: range.startStr,
                end_time: range.endStr,
                notes: '',
            })

            console.log('appointment:', appointment)

            await Swal.fire({
                title: 'Reserva creada',
                text: 'La cita fue registrada correctamente.',
                icon: 'success',
            })

            await loadAvailability()

        } catch (error) {
            console.error('Error al crear cita:', error)
            Swal.fire({
                title: 'Error',
                text: 'No fue posible registrar la cita.',
                icon: 'error',
            })

        }
    }

    // Trae el calendario del profesional, envía ID de profesional para filtrar disponibilidad
    const getAvailability = async (professionalId: number) => {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/appointments/${professionalId}/get-professional-schedule`
        )
        console.log('response: ', response)

        if (!response.ok) {
            throw new Error('Error')
        }

        return response.json()
    }

    const loadAvailability = async () => {

        try {

            const availability = await getAvailability(professionalId)

            setAvailability(availability)

            const calendarEvents =
                availability.map(
                    (slot: { start_time: string; end_time: string; is_available: boolean }) => ({
                        title: slot.is_available ? 'Disponible' : 'No disponible',
                        start: slot.start_time,
                        end: slot.end_time,
                        backgroundColor: slot.is_available ? '#4caf50' : '#ff4d4d',
                        borderColor: slot.is_available ? '#4caf50' : '#ff4d4d',
                        color: slot.is_available ? '#4caf50' : '#ff4d4d'
                    })
                )
            console.log(calendarEvents)

            setEvents(calendarEvents)

        } catch (error) {

            console.error(error)

        }
    }

    const handleEventClick = (clickInfo: EventClickArg) => {

        if (clickInfo.event.title !== 'Disponible') {
            Swal.fire({
                title: 'Horario no disponible',
                icon: 'warning'
            })

            return
        }

        setSelectedRange({
            start: clickInfo.event.start!,
            end: clickInfo.event.end!,
            startStr: clickInfo.event.startStr,
            endStr: clickInfo.event.endStr
        } as DateSelectArg)
    }


    return (
        <div className="p-4">
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                ]}
                initialView="timeGridWeek"
                // selectable={true}
                // select={handleSelect}
                events={events}
                locale={esLocale}
                allDaySlot={false}
                slotMinTime="08:00:00"
                slotMaxTime="20:00:00"
                slotDuration="01:00:00"
                expandRows={true}
                height="80vh"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }}
                eventClick={handleEventClick}
            />

            {selectedRange && (
                <div
                    className="modal-overlay"
                    onClick={closeModal}
                >
                    <div
                        className="modal-box"
                        onClick={(
                            e: React.MouseEvent<HTMLDivElement>
                        ) => e.stopPropagation()}
                    >
                        <button
                            className="close-button"
                            onClick={closeModal}
                        >
                            ✕
                        </button>

                        <h3>Confirmar agendamiento</h3>

                        <p>
                            Fecha:{' '}
                            <b>
                                {selectedRange.start.toLocaleDateString()}
                            </b>
                            <br />

                            Hora inicio:{' '}
                            <b>
                                {selectedRange.start.toLocaleTimeString(
                                    [],
                                    {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }
                                )}
                            </b>
                            <br />

                            Hora fin:{' '}
                            <b>
                                {selectedRange.end.toLocaleTimeString(
                                    [],
                                    {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }
                                )}
                            </b>
                        </p>

                        <div
                            style={{
                                display: 'flex',
                                gap: 10,
                                justifyContent: 'center',
                            }}
                        >
                            <button onClick={closeModal}>
                                Cancelar
                            </button>

                            <button onClick={handleConfirm}>
                                Confirmar
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}