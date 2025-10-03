import React, {useState} from 'react'
import {Form, Formik} from 'formik'

// ✅ Componente React (default)
import FullCalendar from '@fullcalendar/react'

// ✅ Tipos de TS (desde core)
import type {
  DateSelectArg,
  EventClickArg,
  EventChangeArg,
  EventInput,
} from '@fullcalendar/core'

// Plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

// Locale
import esLocale from '@fullcalendar/core/locales/es'

// Estilos (puedes moverlos a main.tsx/index.tsx)
/* 

import '@fullcalendar/daygrid/index.css'
import '@fullcalendar/timegrid/index.css'
import '@fullcalendar/list/index.css'

*/

// Tu componente de fechas
import DateTimePickerField from '../components/fields/DateTimePickerField'

function addMinutes(d: Date, mins: number) {
  return new Date(d.getTime() + mins * 60_000)
}

const CalendarWrapper = () => {
  // Estado local de eventos (agenda en memoria)
  const [events, setEvents] = useState<EventInput[]>([
    {
      id: 'demo-1',
      title: 'Cita demo',
      start: new Date().toISOString(),
      end: addMinutes(new Date(), 60).toISOString(),
    },
  ])

  return (
    <>
      <h3 className='mb-4'>Calendario</h3>

      <Formik
        initialValues={{ startDate: null as Date | null, endDate: null as Date | null }}
        onSubmit={(values, {resetForm}) => {
          if (!values.startDate) return

          const start = values.startDate
          const end = values.endDate ?? addMinutes(values.startDate, 60)

          setEvents(prev => [
            ...prev,
            {
              id: String(Date.now()),
              title: 'Reserva', // cambia por un campo de título si lo tienes
              start: start.toISOString(),
              end: end.toISOString(),
            },
          ])

          resetForm()
          alert('Cita guardada en la agenda')
        }}
      >
        {({handleSubmit, setFieldValue}) => (
          <>
            <Form onSubmit={handleSubmit} className='form mb-6 d-flex gap-3 align-items-end'>
              <div style={{minWidth: 260}}>
                <DateTimePickerField name='startDate' label='Starts' />
              </div>
              <div style={{minWidth: 260}}>
                <DateTimePickerField name='endDate' label='Ends' />
              </div>
              <button type='submit' className='btn btn-primary'>
                Guardar
              </button>
            </Form>

            {/* Calendario */}
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
              locale={esLocale}
              timeZone='America/Monterrey'
              initialView='timeGridWeek'
              height='auto'
              nowIndicator
              selectable       // seleccionar en el calendario
              selectMirror
              editable         // mover/estirar eventos creados
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
              }}
              validRange={{ start: new Date().toISOString().slice(0, 10) }} // no permitir pasado
              slotMinTime='08:00'
              slotMaxTime='20:00'
              events={events}

              // Seleccionar rango → llenar Formik
              select={(info: DateSelectArg) => {
                setFieldValue('startDate', info.start)
                setFieldValue('endDate', info.end)
              }}

              // Click en evento → cargar al formulario
              eventClick={(arg: EventClickArg) => {
                const start = arg.event.start
                const end = arg.event.end
                if (start) setFieldValue('startDate', start)
                if (end) setFieldValue('endDate', end ?? addMinutes(start!, 60))
              }}

              // Drag/resize → actualizar estado
              eventChange={(changeInfo: EventChangeArg) => {
                const e = changeInfo.event
                setEvents(prev =>
                  prev.map(ev =>
                    ev.id === e.id
                      ? { ...ev, start: e.start?.toISOString(), end: e.end?.toISOString() }
                      : ev
                  )
                )
              }}
            />
          </>
        )}
      </Formik>
    </>
  )
}

export { CalendarWrapper }
