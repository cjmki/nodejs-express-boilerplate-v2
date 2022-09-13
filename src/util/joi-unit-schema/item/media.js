import Joi from 'joi';

export default Joi.object({
  thumbnail: Joi.string(),
  image: Joi.string(),
});
