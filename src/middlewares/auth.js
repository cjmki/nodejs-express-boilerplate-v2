import UnauthorizedError from '../exceptions/UnauthorizedError';
import verifyJwt from '../services/user/verifyJwt';

export default (roles) => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    let token;

    if (authHeader) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError('unauthorized');
    }

    const user = await verifyJwt(token);

    if (
      roles !== undefined &&
      roles.length > 0 &&
      user.role &&
      !roles.includes(user.role)
    ) {
      throw new UnauthorizedError('unauthorized');
    }
    res.locals.user = user;
    next();
  };
};
