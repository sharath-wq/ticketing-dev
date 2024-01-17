import request from 'supertest';
import { app } from '../../app';
import { getCookies } from '../../utils/getCookies';

const createTicket = () => {
    return request(app).post('/api/tickets').set('Cookie', getCookies()).send({
        title: 'test',
        price: 20,
    });
};

it('can fetcha list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app).get('/api/tickets').send().expect(200);

    expect(response.body.length).toEqual(3);
});
