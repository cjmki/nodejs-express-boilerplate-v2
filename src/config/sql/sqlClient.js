import Sequelize from 'sequelize';
import config from '../config';

let sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    ...config.db,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize.options.logging = false;

sequelize.Sequelize = Sequelize;

export default sequelize;
