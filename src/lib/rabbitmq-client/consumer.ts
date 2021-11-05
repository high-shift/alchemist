/* eslint-disable @typescript-eslint/no-explicit-any */
import Amqplib from 'amqplib';
import  VError from 'verror';

import { parseMessage } from './utils';
import { RabbitMQClient } from './index';
import MQBase from './base';
import { ConsumerCallback } from './types';

class MQConsumer extends MQBase {
    constructor(rabbitMQClient: RabbitMQClient) {
        super('Consumer', rabbitMQClient);
    }

    private async ack(queue: string, msg: any): Promise<void> {
        try {
            await this.ch.ack(msg);

            this.emit('info', {
                info: 'Message ack',
                queue,
                content: msg.content.toString()
            });
        } catch (err) {
            this.emit('warn', new VError({
                cause: err,
                info: { queue, content: msg.content.toString() }
            }, 'Failed to acknowledge the message'));
        }
    }

    public async consume<T>(queue: string, callback: ConsumerCallback<T>, prefetch = 1, opts?: Amqplib.Options.Consume): Promise<void> {
        try {
            await this.ch.prefetch(prefetch);

            await this.ch.consume(queue, async (msg) => {
                try {
                    if (!msg) {
                        await this.ack(queue, msg);
                        return;
                    }

                    const newMessage = parseMessage<T>(msg);
                    this.emit('info', { info: 'Received message', queue, payload: newMessage });

                    const result = callback(newMessage.payload);

                    if (result instanceof Promise) {
                        await result;
                    }
                } catch (err) {
                    this.emit('warn', new VError({
                        cause: err,
                        info: {
                            queue, opts
                        }
                    }, 'Failed to consume the queue'));
                } finally {
                    await this.ack(queue, msg);
                }
            }, opts);
        } catch (err) {
            console.log(err, '>>>>>>>');
            throw new VError(err, 'Failed to consume the queue');
        }
    }
}

export default MQConsumer;
