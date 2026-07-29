const fs = require('fs');
const path = require('path');

function checkArgv() {
  const recursiveArgs = ['--recursive', '--scan-subdirectories', '--scan-subdirs'];
  return recursiveArgs.some(arg => process.argv.includes(arg));
}

function checkEnv() {
  const envVars = [
    'MEDIA_SCAN_SUBDIRECTORIES',
    'SCAN_SUBDIRECTORIES',
    'MEDIA_SCAN_SUBDIRS',
    'SCAN_SUBDIRS',
    'RECURSIVE',
    'RECURSIVE_SCAN'
  ];
  return envVars.some(envVar => process.env[envVar] === 'true' || process.env[envVar] === '1');
}

function hasDirectSetting(obj) {
  const keys = ['scanSubdirectories', 'scanSubdirs', 'recursive', 'recursiveScan'];
  return keys.some(key => obj[key] === true || obj[key] === 'true');
}

function findSetting(obj) {
  if (!obj || typeof obj !== 'object') return false;
  if (hasDirectSetting(obj)) return true;
  return Object.values(obj).some(
    (val) => typeof val === 'object' && findSetting(val)
  );
}

function checkConfigFiles(configFiles) {
  for (const file of configFiles) {
    try {
      if (fs.existsSync(file)) {
        const content = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (findSetting(content)) return true;
      }
    } catch (e) {}
  }
  return false;
}

function shouldScanSubdirectories() {
  if (checkArgv()) return true;
  if (checkEnv()) return true;

  const configFiles = [
    path.join(__dirname, '..', 'media-config.json'),
    path.join(__dirname, '..', 'media', 'media-config.json'),
    path.join(__dirname, '..', 'package.json'),
    path.join(__dirname, '..', 'app.json')
  ];
  return checkConfigFiles(configFiles);
}

module.exports = {
  shouldScanSubdirectories
};
