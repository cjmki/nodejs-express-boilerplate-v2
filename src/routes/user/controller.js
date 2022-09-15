import schema from './schema';
import login from '../../services/user/login';
import findById from '../../services/user/findById';

const controller = {};

controller.postLogin = async (req, res) => {
  const params = {
    ...req.body,
  };

  const validated = await schema.postLogin.validateAsync(params);
  const data = await login(validated);

  res.json(data);
};

controller.getUserById = async (req, res) => {
  const params = {
    id: req.params.id,
  };

  const validated = await schema.getUserById.validateAsync(params);
  const data = await findById(validated.id);

  res.json(data);
};

export default controller;
