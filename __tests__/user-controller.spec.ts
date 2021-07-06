import { userController } from '../src/controllers';
import { Response, Request } from 'express';
import { User } from '../src/entity/User';

const sut = () => {
    const request = {
        body: {
            email: 'test@behub.io',
            password: 'TestPassword'
        },
        params: {}
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

    const user = {
        id: 1,
        name: 'Test',
        password: 'hashedPassword',
        address: 'Fake Address 771',
        phoneNumber: '551199998888'
    };

    const validateUser: {
        valid: boolean;
        errors: string[]
    } = {
        valid: true,
        errors: []
    };

    return {
        request,
        response,
        user,
        validateUser
    };
};

test('Should create a User register', async () => {
    const { request, response, validateUser } = sut();

    userController.encrypter.hashPassword = jest.fn().mockReturnValue('hashed_password');
    userController.userRepository.save = jest.fn().mockReturnValue({});
    userController.userSchema.validate = jest.fn().mockReturnValue(validateUser);

    const result = await userController.register(request, response);

    expect(result.status).toBe(200);
    expect(userController.encrypter.hashPassword).toBeCalledWith(request.body.password);
    expect(userController.userSchema.validate).toBeCalledWith(request.body);
    expect(userController.userRepository.save).toBeCalledWith({
        ...request.body,
        password: 'hashed_password'
    });
});

test('Should return a User register error', async () => {
    const { request, response, validateUser } = sut();

    userController.encrypter.hashPassword = jest.fn().mockReturnValue('hashed_password');
    userController.userRepository.save = jest.fn().mockImplementation(() => {
        throw new Error('database register error');
    });
    userController.userSchema.validate = jest.fn().mockReturnValue(validateUser);

    const result = await userController.register(request, response);

    expect(result.status).toBe(500);
});

test('Should return a missing parameter error [register]', async () => {
    const { request, response, validateUser } = sut();
    validateUser.valid = false;
    request.params.id = '1';

    userController.userSchema.validate = jest.fn().mockReturnValue(validateUser);

    const result = await userController.register(request, response);

    expect(result.status).toBe(400);
});

test('Should return a User valid token', async () => {
    const { request, response } = sut();
    const user = new User({
        email: 'dev@test.com',
        password: 'q1w2e3',
        name: 'Test',
        phone_number: '5511999999999'
    });

    userController.encrypter.comparePassword = jest.fn().mockReturnValue(true);
    userController.userRepository.findOneByEmail = jest.fn().mockReturnValue(user);

    const result = await userController.login(request, response);

    expect(result.status).toBe(200);
});

test('Should update a valid User', async () => {
    const { request, response, user, validateUser } = sut();
    request.params.id = '1';

    userController.encrypter.hashPassword = jest.fn().mockReturnValue('hashed_password');
    userController.userRepository.findOne = jest.fn().mockImplementation(() => {
        if (user.id === parseInt(request.params.id)) {
            return user;
        } else {
            return null;
        }
    });

    userController.userRepository.updateOne = jest.fn().mockReturnValue({});
    userController.userSchema.validate = jest.fn().mockReturnValue(validateUser);

    const result = await userController.update(request, response);

    expect(result.status).toBe(200);
});

test('Should return a missing parameter error [update]', async () => {
    const { request, response, validateUser } = sut();
    validateUser.valid = false;
    request.params.id = '1';

    userController.userSchema.validate = jest.fn().mockReturnValue(validateUser);

    const result = await userController.update(request, response);

    expect(result.status).toBe(400);
});

test('Should return a invalid user error [not found]', async () => {
    const { request, response } = sut();

    userController.userRepository.findOneByEmail = jest.fn().mockReturnValue(false);

    const result = await userController.login(request, response);

    expect(result.status).toBe(404);
});

test('Should return a invalid user error [invalid password]', async () => {
    const { request, response } = sut();

    userController.userRepository.findOneByEmail = jest.fn().mockReturnValue({ email: 'test@behub.com' });
    userController.encrypter.comparePassword = jest.fn().mockReturnValue(false);

    const result = await userController.login(request, response);

    expect(result.status).toBe(401);
});

test('Should return a invalid user error [missing parameter]', async () => {
    const { request, response } = sut();
    request.body = {};

    userController.userRepository.findOneByEmail = jest.fn().mockReturnValue({ email: 'test@behub.com' });
    userController.encrypter.comparePassword = jest.fn().mockReturnValue(false);

    const result = await userController.login(request, response);

    expect(result.status).toBe(400);
});

test('Should update a not found User', async () => {
    const { request, response, user, validateUser } = sut();
    request.params.id = '2';

    userController.encrypter.hashPassword = jest.fn().mockReturnValue('hashed_password');
    userController.userRepository.findOne = jest.fn().mockImplementation(() => {
        if (user.id === parseInt(request.params.id)) {
            return user;
        } else {
            return null;
        }
    });

    userController.userRepository.updateOne = jest.fn().mockReturnValue({});
    userController.userSchema.validate = jest.fn().mockReturnValue(validateUser);

    const result = await userController.update(request, response);

    expect(result.status).toBe(404);
});

test('Should return a User update error', async () => {
    const { request, response, validateUser } = sut();
    request.params.id = '1';

    userController.encrypter.hashPassword = jest.fn().mockReturnValue('hashed_password');
    userController.userRepository.findOne = jest.fn().mockReturnValue({});
    userController.userRepository.updateOne = jest.fn().mockImplementation(() => {
        throw new Error('database update error');
    });

    userController.userSchema.validate = jest.fn().mockReturnValue(validateUser);

    const result = await userController.update(request, response);

    expect(result.status).toBe(500);
});
