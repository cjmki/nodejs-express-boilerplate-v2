import sqlClient from '../config/sql/sqlClient';
import logger from '../config/logger';

/**
 * module to run sanity checks on outside connections
 */
const checkSQL = async () => {
  try {
    await sqlClient.authenticate();
    logger.info('SQL Server | connection established');
  } catch (err) {
    logger.error(`SQL Server | connection failed | ${err}`);
  }
};

const initiate = () => {
  checkSQL();
};

export default { initiate };
