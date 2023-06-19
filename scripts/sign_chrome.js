// Requirements...
require('dotenv').config();
const execSync = require('child_process').execSync;
const path = require("path");
const fs = require('fs');

const repoRoot =  path.resolve(__dirname, '../')
const extRoot = `${repoRoot}/extension`;
const pemPath = process.env.CHROME_PRIVATE_KEY_PATH || `${repoRoot}/chrome-artifacts/extension.pem`;

// Execute the command...
execSync(`${process.env.CHROME_EXECUTABLE_PATH} --pack-extension=\"${extRoot}\" --pack-extension-key=\"${pemPath}\"`, { stdio: [0, 1, 2] });

try {
  fs.mkdirSync(`${repoRoot}/chrome-artifacts`);
  fs.renameSync(`${repoRoot}/extension.crx`, `${repoRoot}/chrome-artifacts/extension.crx`);
  fs.renameSync(`${repoRoot}/extension.pem`, `${repoRoot}/chrome-artifacts/extension.pem`);
} catch (e) {
  console.error('An error occurred moving the artifacts:')
  console.error(e)
}