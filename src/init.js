import path from 'path';
import pkg from '../package';

/**
 * Initialize the monitor and start monitoring configured services.
 */
export default async function init(callback) {
  process.stdout.write(`Starting ${pkg.name} ${pkg.version}\n`);

  try {
    const { resolve, DEFAULT_FILENAME } = await import('./config/config');

    // Config file for chill could be added using environment variables too.
    const configFile = process.env.CHILL_CONFIG || path.resolve(DEFAULT_FILENAME);
    const config = resolve(configFile);

    callback(config);

    return;
    // Start the app
  } catch (err) {
    process.stderr.write('An error occurred: \n' + err);
  }
}
