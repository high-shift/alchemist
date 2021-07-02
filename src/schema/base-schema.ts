import { Schema } from 'joi';
import { ValidateResult } from './protocols';

abstract class BaseSchema<T> {
    schema: Schema;

    validate(json: T): ValidateResult {
        if (!this.schema) {
            throw new Error('Entity must have a schema');
        }

        const result: ValidateResult = {
            valid: true,
            errors: []
        };

        const { error } = this.schema.validate(json, { abortEarly: false });

        if (error) {
            result.valid = false;
            result.errors = error.details.map(error => error.message);
        }

        return result;
    }
}

export default BaseSchema;
