import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useMemo, useState, useCallback, useEffect, useContext } from "react";
import { ContainerCalendar } from "./CalendarStyle";
import moment from 'moment';
import 'moment/locale/pt-br';
import { Event } from '../../Types/TEvent';
import * as eventsApi from '../../Services/eventsApi';

const localizer = momentLocalizer(moment);

function CalendarElement(){
    const messages = {
        allDay: 'Dia Inteiro',
        previous: '<',
        next: '>',
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
        agenda: 'Agenda',
        date: 'Data',
        time: 'Hora',
        event: 'Evento',
        showMore: (total: number) => `+ (${total}) Eventos`}

    // definindo algumas variaveis para poder usar a biblioteca
    const { defaultDate, views, formats } = useMemo ( () => ( { 
        defaultDate : new Date (), views: [Views.MONTH, Views.WEEK, Views.DAY],       
        formats: {
            dayFormat: (date: Date, culture: any, localizer: any) =>
            localizer.format(date, 'ddd DD/MM', culture),
    }, } ) , [ ] );

    const [events, setEvents] = useState<Event[]> ([]);

    async function getEventsRegister(){
        const register = await eventsApi.getEvents()
        register?.forEach((event) => {event.start = new Date(event.start), event.end = new Date(event.end)})
        setEvents(register!)
    
    }

    useEffect(() => {
        getEventsRegister()
    }, [])
    console.log(events)

    // quando clica em alguma data
    const handleSelectSlot = useCallback(
      ({start, end } : { start: Date; end: Date; }) => {
            const title = window.prompt('New Event name')
            if (title) {
                eventsApi.createEvents({title, start, end})
                setEvents((prev) => [...prev, { start , end, title }])
        }}, [setEvents])
    
    // quando clica em algum evento
    const handleSelectEvent = useCallback(
    (event: any) => {window.alert(event.title)}
    , [] )
        
    
    return (
        <ContainerCalendar>
                <Calendar 
                    onSelectSlot={handleSelectSlot} 
                    defaultDate = { defaultDate } 
                    onSelectEvent = {handleSelectEvent}
                    localizer = {localizer}
                    style = {{ height: '80vh' }}
                    selectable
                    events ={events}
                    popup
                    defaultView={Views.MONTH}
                    views = {views}
                    messages={messages}
                    scrollToTime={defaultDate}
                    startAccessor="start"
                    endAccessor="end"  
                    culture="pt-br"
                    formats={formats}
                    />
        </ContainerCalendar>
    )
}

export default CalendarElement;

