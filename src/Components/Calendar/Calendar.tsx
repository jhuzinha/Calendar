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
    const [auxiliar, setAuxiliar] = useState([...events]);

    async function getEventsRegister(){
        const register = await eventsApi.getEvents()
        register?.forEach((event) => {event.start = new Date(event.start), event.end = new Date(event.end)})
        setEvents(register!)
    
    }

    useEffect(() => {
        getEventsRegister()
    }, [auxiliar])

    // quando clica em alguma data
    const handleSelectSlot = useCallback(
      ({
        start,
        end, 
        slots,
        action
      } : {
        start: Date;
        end: Date;
        slots: Date[] | string[];
        action: 'select' | 'click' | 'doubleClick';
      }) => {
            const title = window.prompt('New Event name')
            if (title) {
                eventsApi.createEvents({title, start, end})
                setAuxiliar([...auxiliar, { start , end, title }])
        }}, [setAuxiliar])
    

    
    return (
        <ContainerCalendar>
                <Calendar 
                    onSelectSlot={handleSelectSlot} 
                    defaultDate = { defaultDate } 
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

