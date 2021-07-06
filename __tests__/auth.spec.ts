import auth from '../src/middlewares/auth';
import { Request, Response } from 'express';
import * as http from '../src/http';
import utils from '../src/utils';

const sut = () => {
    const request = {
        headers: {
            'authorization': ''
        }
    } as Request;

    const response = {
        status(statusCode: number) {
            this.status = statusCode;
            return this;
        },

        send(data: Record<string, unknown>) {
            this.data = data;
            return this;
        },

        json(data: Record<string, unknown>) {
            this.data = data;
            return this;
        }
    } as Response;

    const next = (): string => {
        return 'next';
    };

    return {
        request,
        response,
        next
    };
};

test('Should return a missing token error', () => {
    const { request, response, next } = sut();
    const spy = jest.spyOn(http, 'missingParameters');

    auth(request, response, next);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(response, 'token');
});

test('Should return a missing unauthorized error', () => {
    const { request, response, next } = sut();
    const spy = jest.spyOn(http, 'unauthorized');

    request.headers.authorization = 'jwttoken';
    utils.token.validate = jest.fn().mockReturnValue(null);

    auth(request, response, next);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(response);
});

test('Should return a valid token', () => {
    const { request, response, next } = sut();
    request.headers.authorization = 'jwttoken';
    utils.token.validate = jest.fn().mockReturnValue(true);

    const result = auth(request, response, next);

    expect(result).toBe(next());
});
