import { Publisher, Subjects, TicketUpdatedEvent } from '@scticketscommon/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
