import { Publisher, Subjects, OrderCancelledEvent } from '@scticketscommon/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
