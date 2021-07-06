import { UserJson } from '../entity/User';

export interface Encrypter {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export interface Token {
    generate(user: UserJson): string;
    validate(token: string): UserJson | null;
}
