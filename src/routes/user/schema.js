import Joi from 'joi';

let schema = {};

schema.postLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

schema.getUserById = Joi.object({
  id: Joi.string().required(),
});

export default schema;
