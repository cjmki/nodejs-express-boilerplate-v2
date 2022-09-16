import Joi from 'joi';
import email from '../../util/unit-schemas/email';

let schema = {};

schema.postLogin = Joi.object({
  email: email.required(),
  password: Joi.string().required(),
});

export default schema;
