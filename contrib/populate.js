import models from '../src/models/sql';
const main = async () => {
  console.log('[+] SQL - populating database with test data | initiated');
  await models.sqlClient.sync({ force: true });
  console.log('[+] SQL - populating database with test data | completed');
};

main();
