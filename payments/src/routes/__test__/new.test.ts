import request from 'supertest';
import { app } from '../../app';
import { getCookies } from '../../utils/getCookies';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { OrderStatus } from '@scticketscommon/common';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payments';

jest.mock('../../stripe');

it('returns a 404 when purchasing an order that does ont exists', async () => {
    await request(app).post('/api/payments').set('Cookie', getCookies()).send({
        token: 'asdhfk',
        orderId: new mongoose.Types.ObjectId().toHexString(),
    });

    expect(404);
});

it('returns a 401 when pruchasign an order that dosent belong to the user', async () => {
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        price: 20,
        status: OrderStatus.Created,
    });
    await order.save();

    await request(app).post('/api/payments').set('Cookie', getCookies()).send({
        token: 'asdhfk',
        orderId: order.id,
    });

    expect(401);
});

it('reutnrs a 400 when purchasign a cancelled order', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId: userId,
        version: 0,
        price: 20,
        status: OrderStatus.Cancelled,
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', getCookies(userId))
        .send({
            orderId: order.id,
            token: 'dadkf',
        })
        .expect(400);
});

// it('retunrs a 204 with valid inputs', async () => {
//     const userId = new mongoose.Types.ObjectId().toHexString();

//     const order = Order.build({
//         id: new mongoose.Types.ObjectId().toHexString(),
//         userId: userId,
//         version: 0,
//         price: 20,
//         status: OrderStatus.Created,
//     });
//     await order.save();

//     await request(app)
//         .post('/api/payments')
//         .set('Cookie', getCookies(userId))
//         .send({
//             token: 'tok_visa',
//             orderId: order.id,
//         })
//         .expect(201);

//     const paymentIntentsOptions = (stripe.paymentIntents.create as jest.Mock).mock.calls[0][0];
//     expect(paymentIntentsOptions.amount).toEqual(20 * 100);
//     expect(paymentIntentsOptions.currency).toEqual('inr');

//     const payment = await Payment.findOne({
//         orderId: order.id,
//         stripeId: paymentIntentsOptions.id,
//     });

//     expect(payment).not.toBeNull();
// });
