import express from 'express';
import config from '../config';
import router from './router';

export default class Server {
    app: express.Application;
    port: number;

    constructor() {
        this.port = config.PORT;
        this.app = express();
        this.app.use(express.json());
        this.app.use(router);
    }

    listen(): void {
        this.app.listen(this.port, () => console.log(`Server listen at ${this.port}`));
    }
}
