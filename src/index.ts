import 'dotenv/config';
import { createConnection } from 'typeorm';
import Server from './app/server';

(async () => {
    try {
        await createConnection();
        const server = new Server();
        server.listen();
    } catch (e) {
        console.error(e.stack);
    }
})();
