import { Request, Response } from 'express';
import { ok } from '../http';

class MainController {
    healthcheck(_request: Request, response: Response): Response {
        return ok(response, {
            message: 'ok'
        });
    }
}

export default MainController;
