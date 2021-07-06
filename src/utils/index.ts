import EncrypterAdapter from './encrypter-adapter';
import TokenAdapter from './token-adapter';

export default {
    encrypter: new EncrypterAdapter(),
    token: new TokenAdapter()
};
