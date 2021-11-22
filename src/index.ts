import './utils/logger';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import Server from './app/server';
import { loadConsumers, rabbitMQClient } from './infra/rabbitmq';

(async () => {
    try {
        await createConnection();
        await rabbitMQClient.init();
        const server = new Server();
        loadConsumers();
        server.listen();
    } catch (e) {
        console.error(e.stack);
    }
})();
