import models from '../src/models/sql';
import users from './sql/users';

const main = async () => {
  console.log('[+] SQL - populating database with test data | initiated');
  await models.sqlClient.sync({ force: true });
  console.log(`[+] SQL - users | initiated`);
  await users.populate(models, (email, role) => ` | ${email} - [${role}] `);
  console.log(`[+] SQL - users | completed`);
  console.log('[+] SQL - populating database with test data | completed');
};

main();
