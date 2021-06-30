
import { Response } from 'express';

const ok = (response: Response, data: unknown): Response => {
    return response.status(200).send(data);
};

const serverError = (response: Response): Response => {
    return response.status(500).send({
        message: 'server error'
    });
};

const unauthorized = (response: Response): Response => {
    return response.status(401).send({
        message: 'unauthorized'
    });
};

const missingParameters = (response: Response, error: string[] | string = null): Response => {
    return response.status(400).send({
        message: 'missing parameters',
        error: error
    });
};

const conflict = (response: Response, error: string):Response => {
    return response.status(409).send({
        message: error || 'resource already exists'
    });
};

const notFound = (response: Response, error: string): Response => {
    return response.status(404).send({
        message: error || 'resource not found'
    });
};

export {
    ok,
    serverError,
    unauthorized,
    missingParameters,
    conflict,
    notFound
};
