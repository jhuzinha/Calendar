import api from './api';
import { Event } from '../Types/TEvent';
import { toast } from 'react-toastify';

export async function getEvents(): Promise<Event[] | undefined> {
    try {
        const response = await api.get('/events');
        return [...response.data];
    } catch(error){
        console.log(error)
    }
};

export async function createEvents(event: Event){
    try {
    const response = await api.post('/events', event)
    toast.success("Criado com sucesso")
    return response;
    } catch(error){
    console.log(error)
    }
};

export async function deleteEvents(id: number){
    const response = await api.delete(`/events/${id}`)
    return response;
};