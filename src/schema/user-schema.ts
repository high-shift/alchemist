import Joi from 'joi';
import BaseSchema from './base-schema';
import { UserJson } from '../entity/User';

class UserSchema extends BaseSchema<UserJson> {
    schema: Joi.Schema = Joi.object({
        update: Joi.boolean(),

        email: Joi.string()
            .email()
            .required(),

        password: Joi.string()
            .when('update', {
                is: true,
                then: Joi.optional(),
                otherwise: Joi.required()
            })
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        name: Joi.string()
            .min(3)
            .max(30)
            .required(),

        phone_number: Joi.string().required(),

        schema: Joi.object()
    }).unknown();
}

export default UserSchema;
