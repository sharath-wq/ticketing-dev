import { Listener, OrderCreatedEvent, Subjects } from '@scticketscommon/common';
import { expirationQueue } from '../../queues/expiration-queue';

import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;

    queueGroupName: string = queueGroupName;
    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        await expirationQueue.add({
            orderId: data.id,
        });

        msg.ack();
    }
}
