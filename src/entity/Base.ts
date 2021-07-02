import Joi from 'joi';

interface ValidateResult {
    valid: boolean;
    errors: string[]
}

class Base {
    schema: Joi.Schema;

    validate(): ValidateResult {
        if (!this.schema) {
            throw new Error('Entity must have a schema');
        }

        const result: ValidateResult = {
            valid: true,
            errors: []
        };

        const { error } = this.schema.validate(this, { abortEarly: false });

        if (error) {
            result.valid = false;
            result.errors = error.details.map(error => error.message);
        }

        return result;
    }
}

export default Base;
