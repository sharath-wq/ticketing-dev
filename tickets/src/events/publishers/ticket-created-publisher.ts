import { Publisher, Subjects, TicketCreatedEvent } from '@scticketscommon/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
