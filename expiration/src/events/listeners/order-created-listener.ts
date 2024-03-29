import { Listener, OrderCreatedEvent, Subjects } from '@scticketscommon/common';
import { expirationQueue } from '../../queues/expiration-queue';

import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;

    queueGroupName: string = queueGroupName;
    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

        console.log('Waithing this many millisecond to process a job', delay);

        await expirationQueue.add(
            {
                orderId: data.id,
            },
            {
                delay: delay,
            }
        );

        msg.ack();
    }
}
