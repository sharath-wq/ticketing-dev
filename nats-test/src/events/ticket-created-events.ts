import { Sujbects } from './subjects';

export interface TicketCreatedEvent {
    subject: Sujbects.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
    };
}
