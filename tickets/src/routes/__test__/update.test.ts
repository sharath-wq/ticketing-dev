import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { getCookies } from '../../utils/getCookies';
import { natsWrapper } from '../../nats-wrapper';
import { Ticket } from '../../models/ticket';

it('retunes a 404 if the provided id is not exists', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', getCookies())
        .send({
            title: 'adkadfk',
            price: 20,
        })
        .expect(404);
});

it('retunes a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'adkadfk',
            price: 20,
        })
        .expect(401);
});

it('retunes a 401 if the user is not own the ticket', async () => {
    const response = await request(app).post('/api/tickets').set('Cookie', getCookies()).send({
        title: 'akdk',
        price: 20,
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', getCookies())
        .send({
            title: 'dsfjks',
            price: 10,
        })
        .expect(401);
});

it('retunes a 400 if the user provides an invalid title or price', async () => {
    const cookie = getCookies();
    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'dajsk',
        price: 20,
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20,
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'dlfkjsakf',
            price: -20,
        })
        .expect(400);
});

it('updtes the ticket provieded valid inputs', async () => {
    const cookie = getCookies();

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'dkjfk',
        price: 20,
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new Title',
            price: 100,
        })
        .expect(200);

    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send({});

    expect(ticketResponse.body.title).toEqual('new Title');
    expect(ticketResponse.body.price).toEqual(100);
});

it('publishes an event', async () => {
    const cookie = getCookies();

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'dkjfk',
        price: 20,
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new Title',
            price: 100,
        })
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('rejects updates if the ticket is reserved', async () => {
    const cookie = getCookies();

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'dkjfk',
        price: 20,
    });

    const ticket = await Ticket.findById(response.body.id);
    ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
    await ticket!.save();

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new Title',
            price: 100,
        })
        .expect(400);
});
