import schema from './schema';
import login from '../../services/user/login';
import validateRequest from '../../util/validateRequest';

const controller = {};

controller.postLogin = async (req, res) => {
  const params = {
    ...req.body,
  };

  const validated = await validateRequest(params, schema.postLogin);
  const token = await login(validated);

  res.json({ data: token });
};

export default controller;
