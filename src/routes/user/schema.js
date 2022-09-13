import Joi from 'joi';

const getUserById = Joi.object({
  id: Joi.string().required(),
});

export { getUserById };
