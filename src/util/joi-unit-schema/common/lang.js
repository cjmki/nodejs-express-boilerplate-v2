import Joi from 'joi';

export default Joi.string()
  .lowercase()
  .regex(/^(en|si|ta)$/);
