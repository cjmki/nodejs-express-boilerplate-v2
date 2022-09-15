import models from '../../models/sql';
import sqlClient from '../../config/sql/sqlClient';
import NotFoundError from '../../exceptions/NotFoundError';

export default async (id) => {
  const Op = sqlClient.Sequelize.Op;
  let query = {
    id: { [Op.eq]: id },
  };

  let user = await models.user.findOne({ where: query });

  if (!user) throw new NotFoundError('no user');

  return user;
};
