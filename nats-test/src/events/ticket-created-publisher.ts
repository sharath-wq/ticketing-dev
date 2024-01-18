import { Publisher } from './base-publisher';
import { TicketCreatedEvent } from './ticket-created-events';
import { Sujbects } from './subjects';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Sujbects.TicketCreated = Sujbects.TicketCreated;
}
