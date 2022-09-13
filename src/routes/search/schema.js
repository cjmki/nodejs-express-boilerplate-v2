import Joi from 'joi';

import term from '../../util/joi-unit-schema/common/suggestTerm';

const suggestTerm = Joi.object({
  term: term.required(),
});

export { suggestTerm };
