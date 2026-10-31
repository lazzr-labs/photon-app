import path from 'path';
import minimist from 'minimist';
import { fileURLToPath } from 'url';
import { Storage } from '@google-cloud/storage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = minimist(process.argv.slice(2));
const env = args.env;

if (!env || (env !== 'prod' && env !== 'stag')) {
  throw new Error('Invalid environment. (prod or stag).');
}

const folderPath = 'dist';

const gcpConfig = {
  projectId: '[cloud]-gcp',
  keyFilename: path.join(__dirname, 'gcp.json'),
};

const bucketNames = {
  stag: '[project]-app-stag',
  prod: '[project]-app-prod',
};

const storage = new Storage(gcpConfig);
const bucket = storage.bucket(bucketNames[env]);

export {
  bucket,
  folderPath,
};
