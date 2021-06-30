import 'dotenv/config';

import Server from './app/server';

(async () => {
    try {
        const server = new Server();
        server.listen();
    } catch (e) {
        console.error(e.stack);
    }
})();
