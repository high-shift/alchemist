import { RabbitMQClient } from 'rabbitmq-client';
import config from '../../config';
import OrderConsumer from './order-consumer';

const amqpUrl = config.RABBITMQ_URL;
const rabbitMQClient = new RabbitMQClient(amqpUrl, { consumer: true });

const loadConsumers = (): void => {
    OrderConsumer();
};

export {
    rabbitMQClient,
    loadConsumers
};
