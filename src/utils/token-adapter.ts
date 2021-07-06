import { Token } from './protocols';
import { UserJson } from '../entity/User';
import jwt from 'jsonwebtoken';
import config from '../config';

class TokenAdapter implements Token {
    generate(userJson: UserJson): string {
        return jwt.sign(userJson, config.SECRET, {
            expiresIn:  '1h'
        });
    }

    validate(token: string): UserJson {
        try {
            const decoded = jwt.verify(token, config.SECRET);
            return decoded as UserJson;
        } catch (error) {
            return null;
        }

    }
}

export default TokenAdapter;
