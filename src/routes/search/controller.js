import NotFoundError from '../../exceptions/NotFoundError';
import { suggestTerm } from './schema';
import suggest from '../../services/search/suggest';
import logger from '../../config/logger';
const controller = {};

controller.search = async (req, res) => {
  const params = {
    sort: req.params.sort,
    item: req.params.param,
    ...req.query,
  };

  const validated = params;
  const doc = validated;
  // const doc = false;

  if (doc) {
    res.json({ data: doc });
  } else {
    throw new NotFoundError('resource not found');
  }
};

controller.suggest = async (req, res) => {
  const params = {
    term: req.query.term,
  };

  const validated = await suggestTerm.validateAsync(params);
  logger.info(validated.term);
  const data = await suggest(validated.term);

  res.send(data);
};

controller.searchByFilter = async (req, res) => {
  const params = {
    sort: req.params.sort,
    item: req.params.param,
    ...req.query,
  };

  const validated = params;
  const doc = validated;
  // const doc = false;

  if (doc) {
    res.json({ data: doc });
  } else {
    throw new NotFoundError('resource not found');
  }
};

export default controller;
