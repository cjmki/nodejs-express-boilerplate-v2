import { getItemById } from './schema';
const controller = {};

controller.getUserById = async (req, res) => {
  const params = {
    id: req.params.id,
  };

  const validated = await getItemById.validateAsync(params);
  res.json(validated);
};

export default controller;
