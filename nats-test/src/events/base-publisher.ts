import { Stan } from 'node-nats-streaming';
import { Sujbects } from './subjects';

interface Event {
    subject: Sujbects;
    data: any;
}

export abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];
    private client: Stan;

    constructor(client: Stan) {
        this.client = client;
    }

    publish(data: T['data']) {
        return new Promise<void>((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {
                if (err) {
                    return reject(err);
                }
                console.log('Event published to subject', this.subject);

                resolve();
            });
        });
    }
}
