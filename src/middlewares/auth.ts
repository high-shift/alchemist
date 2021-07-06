import { Request, Response, NextFunction } from 'express';
import { missingParameters, unauthorized } from '../http';
import utils from '../utils';

export default (request: Request, response: Response, next: NextFunction): Response | void => {
    const { authorization } = request.headers;

    if (!authorization) {
        return missingParameters(response, 'token');
    }

    const decoded = utils.token.validate(authorization.split(' ')[1] || '');

    if (!decoded) {
        return unauthorized(response);
    }

    request.user = decoded;

    return next();
};
