import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-events';
import { Sujbects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Sujbects.TicketCreated = Sujbects.TicketCreated;
    queueGroupName: string = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log('Event Data!', data);

        console.log(data.id);
        console.log(data.title);
        console.log(data.price);

        msg.ack();
    }
}
