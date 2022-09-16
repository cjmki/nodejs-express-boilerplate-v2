import ValidationError from '../exceptions/ValidationError';

export default async (params, schema) => {
  let val;
  try {
    val = await schema.validateAsync(params);
  } catch (err) {
    throw new ValidationError(err.details[0].message);
  }

  return val;
};
