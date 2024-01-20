import { Publisher, OrderCreatedEvent, Subjects } from '@scticketscommon/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
