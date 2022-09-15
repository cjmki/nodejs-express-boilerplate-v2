import models from '../../models/sql';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import UnauthorizedError from '../../exceptions/UnauthorizedError';

// Decodes a jwt token and returns the corresponding user object if successful.
export default async (token) => {
  const decoded = jwt.verify(token, config.JWT_SECRET);

  const user = await models.user.findOne({
    attributes: { exclude: ['password_digest'] },
    where: {
      email: decoded.email,
    },
  });

  // if the ctx is not in the database don't accept the token.
  if (!user || !user.verifyCtxToken(decoded.ctx)) {
    throw new UnauthorizedError('unauthorized');
  }

  return user;
};
