import { Request, Response } from 'express';

import { UserRepository, AccountRepository } from '../repository/protocols';
import { Encrypter, Token } from '../utils/protocols';
import { UserSchema } from '../schema/protocols';
import { User } from '../entity/User';

import { missingParameters, serverError, ok, conflict, notFound, unauthorized } from '../http';
import { underscoreToCamelCase } from '../utils/helpers';
import { Account } from '../entity/Account';

class UserController {
    public userRepository: UserRepository;
    public accountRepository: AccountRepository;
    public userSchema: UserSchema;
    public encrypter: Encrypter;
    public token: Token;

    constructor(
        userSchema: UserSchema,
        userRepository: UserRepository,
        accountRepository: AccountRepository,
        encrypter: Encrypter,
        token: Token
    ) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.userSchema = userSchema;
        this.encrypter = encrypter;
        this.token = token;
    }

    async register(request: Request, response: Response): Promise<Response> {
        try {
            console.log(request.body);
            const bodyCheck = this.userSchema.validate(request.body);

            if (!bodyCheck.valid) {
                return missingParameters(response, bodyCheck.errors);
            }

            const hashedPassword = await this.encrypter.hashPassword(request.body.password);
            const user = new User({ ...underscoreToCamelCase(request.body), password: hashedPassword });
            const account = new Account();
            account.users = [user];
            await this.userRepository.save(user);
            await this.accountRepository.save(account);

            return ok(response, user.getJsonBody());
        } catch (error) {
            console.log(error, 'asdfsfdsa');

            if (error.code && error.code === 'ER_DUP_ENTRY') {
                return conflict(response, 'user already exists');
            }

            return serverError(response);
        }
    }

    async update(request: Request, response:Response): Promise<Response> {
        try {
            const { id } = request.params;
            const bodyCheck = this.userSchema.validate({ ...request.body, update: true });
            const findUser = await this.userRepository.findOne(parseInt(id));

            if (!findUser) {
                return notFound(response, 'user not found');
            }

            if (!bodyCheck.valid) {
                return missingParameters(response, bodyCheck.errors);
            }

            if (request.body.password) {
                const compare = await this.encrypter.comparePassword(request.body.password, findUser.password);

                if (!compare) {
                    request.body.password = await this.encrypter.hashPassword(request.body.password);
                }
            }

            const user = new User(underscoreToCamelCase(request.body));
            await this.userRepository.updateOne(parseInt(id), user);

            return ok(response, user.getJsonBody());
        } catch (error) {
            console.error(error);
            return serverError(response);
        }
    }

    async login(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body;

            if (!email || !password) {
                return missingParameters(response);
            }

            const user = await this.userRepository.findOneByEmail(email);

            if (!user) {
                return notFound(response, 'user not found');
            }

            const validPassword = await this.encrypter.comparePassword(password, user.password);

            if (!validPassword) {
                return unauthorized(response);
            }

            const token = this.token.generate(user.getJsonBody());

            return ok(response, { token });
        } catch (error) {
            console.error(error);

            return serverError(response);
        }
    }

    me(request: Request, response: Response): Response {
        return ok(response, request.user);
    }
}

export default UserController;
