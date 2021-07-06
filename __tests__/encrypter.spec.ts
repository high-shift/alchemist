import EncrypterAdapter from '../src/utils/encrypter-adapter';

const encrypter = new EncrypterAdapter();

test('Should return a hashed password', async () => {
    const hashedPassword = await encrypter.hashPassword('q1w2e3');
    expect(hashedPassword.length).toBe(60);
});

test('Should compare a valid password', async() => {
    const hashedPassword = await encrypter.hashPassword('q1w2e3');
    const compare = await encrypter.comparePassword('q1w2e3', hashedPassword);
    console.log('comp', compare);

    expect(compare).toBe(true);
});

test('Should compare a invalid password', async () => {
    const hashedPassword = await encrypter.hashPassword('q1w2e3');
    const compare = await encrypter.comparePassword('q1w2e3r4', hashedPassword);

    expect(compare).toBe(false);
});
