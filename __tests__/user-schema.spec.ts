import UserSchema from '../src/schema/user-schema';

const sut = () => {
    const userSchema = new UserSchema();

    const userRequest = {
        email: 'test@behub.com',
        password: 'qwert12345',
        name: 'Test User',
        phone_number: '11944445555',
        update: false,
    };

    return {
        userSchema,
        userRequest
    };
};

test('Should return an invalid User - missing parameters [email]', () => {
    const { userSchema, userRequest } = sut();
    delete userRequest.email;
    const result = userSchema.validate(userRequest);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0]).toBe('"email" is required');
});

test('Should return an invalid User - missing parameters [password]', () => {
    const { userSchema, userRequest } = sut();
    delete userRequest.password;
    const result = userSchema.validate(userRequest);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0]).toBe('"password" is required');
});

test('Should return an invalid User - missing parameters [name]', () => {
    const { userSchema, userRequest } = sut();
    delete userRequest.name;
    const result = userSchema.validate(userRequest);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0]).toBe('"name" is required');
});

test('Should return an invalid User - missing parameters [phone_number]', () => {
    const { userSchema, userRequest } = sut();
    delete userRequest.phone_number;
    const result = userSchema.validate(userRequest);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0]).toBe('"phone_number" is required');
});

test('Should return an invalid User - invalid parameter [email]', () => {
    const { userSchema, userRequest } = sut();
    userRequest.email = 'invalid.email';
    const result = userSchema.validate(userRequest);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0]).toBe('"email" must be a valid email');
});

test('Should return a valid User', () => {
    const { userSchema, userRequest } = sut();
    const result = userSchema.validate(userRequest);

    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
});

test('Should not validate a password if update flag is true', () => {
    const { userSchema, userRequest } = sut();
    delete userRequest.password;
    userRequest.update = true;
    const result = userSchema.validate(userRequest);

    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
});
