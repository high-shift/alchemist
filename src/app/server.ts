import express from 'express';
import config from '../config';

export default class Server {
    app: express.Application;
    port: number;

    constructor() {
        this.port = config.PORT;
        this.app = express();
    }
    listen(): void {
        this.app.listen(this.port, () => console.log(`Server listen at ${this.port}`));
    }
}
