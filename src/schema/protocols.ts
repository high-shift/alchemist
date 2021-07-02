import { UserJson } from '../entity/User';

export interface ValidateResult {
    valid: boolean;
    errors: string[]
}

export interface Schema<T> {
    validate(json: T): ValidateResult
}

export interface UserSchema extends Schema<UserJson> { }
