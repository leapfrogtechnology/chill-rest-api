import 'babel-polyfill';
import { resolveConfig } from '../init';

(async () => {
  const config = await resolveConfig();
  const db = await import('../utils/db');
  const { synchronize } = await import('../services/persistence');

  try {
    await synchronize();
    db.getClient().knex.destroy();
  } catch (err) {
    process.stderr.write('An error occurred: \n' + err);
  }
})();
