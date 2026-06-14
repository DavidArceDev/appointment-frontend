import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import Swal from 'sweetalert2'
import '../styles/calendar.css'
import { createAppointment } from '../services/api'
import type { DateSelectArg } from '@fullcalendar/core'

type CalendarEvent = {
  title: string
  start: string
  end: string
  backgroundColor: string
  borderColor: string
}

export default function AppointmentCalendar() {

  const [selectedRange, setSelectedRange] =
    useState<DateSelectArg | null>(null)

  const closeModal = () => setSelectedRange(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }

    window.addEventListener('keydown', onKey)

    return () =>
      window.removeEventListener('keydown', onKey)
  }, [])

  const [events, setEvents] =
    useState<CalendarEvent[]>([
      {
        title: 'No disponible',
        start: '2025-11-05T10:00:00',
        end: '2025-11-05T11:00:00',
        backgroundColor: '#ff4d4d',
        borderColor: '#ff4d4d',
      },
      {
        title: 'No disponible',
        start: '2025-11-06T14:00:00',
        end: '2025-11-06T15:00:00',
        backgroundColor: '#ff4d4d',
        borderColor: '#ff4d4d',
      },
      {
        title: 'Cita confirmada',
        start: '2025-11-07T09:00:00',
        end: '2025-11-07T10:00:00',
        backgroundColor: '#ff4d4d',
        borderColor: '#ff4d4d',
      },
    ])

  const handleSelect = (
    info: DateSelectArg
  ) => {
    setSelectedRange(info)
  }

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

      const appointment =
        await createAppointment({
          professional_id: 1,
          patient_id: 1,
          start_time: range.startStr,
          end_time: range.endStr,
          notes: '',
        })

      console.log('appointment:', appointment)

      const newEvent: CalendarEvent = {
        title: 'Nueva cita reservada',
        start: range.startStr,
        end: range.endStr,
        backgroundColor: '#4caf50',
        borderColor: '#4caf50',
      }

      setEvents((prev) => [
        ...prev,
        newEvent,
      ])

      await Swal.fire({
        title: 'Reserva creada',
        text: 'La cita fue registrada correctamente.',
        icon: 'success',
      })

    } catch (error) {

      Swal.fire({
        title: 'Error',
        text: 'No fue posible registrar la cita.',
        icon: 'error',
      })

    }
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
        selectable={true}
        select={handleSelect}
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