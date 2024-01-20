import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { TicketUpdatedEvent } from '@scticketscommon/common';
import { Message } from 'node-nats-streaming';

const setup = async () => {
    // create a lister
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // create and save a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
    });
    await ticket.save();

    // careate a fake data object
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new ticket',
        price: 200,
        userId: new mongoose.Types.ObjectId().toHexString(),
    };

    // careate a fake msg object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    // return all of it
    return { msg, data, ticket, listener };
};

it('finds, update and saves ticket ', async () => {
    const { msg, data, ticket, listener } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { msg, data, listener } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('does nto call ack if the event has a skipped version number', async () => {
    const { msg, data, listener, ticket } = await setup();

    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    } catch (error) {}

    expect(msg.ack).not.toHaveBeenCalled();
});
