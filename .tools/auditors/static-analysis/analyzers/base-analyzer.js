const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);
const { ROOT_DIR } = require('../config');

class BaseAnalyzer {
  constructor({ id, name, description }) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  async isAvailable() {
    return true;
  }

  getCommand(profile, profileConfig) {
    throw new Error(`getCommand() not implemented for analyzer ${this.name}`);
  }

  normalize(rawOutput, profile) {
    throw new Error(`normalize() not implemented for analyzer ${this.name}`);
  }

  async run(profile, profileConfig) {
    const startTime = Date.now();
    let rawOutput = '';
    let errorMsg = null;
    let status = 'success';
    let findings = [];

    try {
      const command = this.getCommand(profile, profileConfig);
      const { stdout } = await execAsync(command, {
        cwd: ROOT_DIR,
        maxBuffer: 50 * 1024 * 1024
      });
      rawOutput = stdout;
    } catch (err) {
      if (err.stdout && (err.code === 1 || err.code === 2 || err.code > 0)) {
        rawOutput = err.stdout;
        status = 'success';
      } else {
        status = 'failed';
        errorMsg = err.message || 'Unknown error during execution';
        rawOutput = err.stdout || '';
      }
    }

    if (status === 'success' && rawOutput) {
      try {
        findings = this.normalize(rawOutput, profile);
      } catch (parseErr) {
        status = 'failed';
        errorMsg = `Failed to parse analyzer output: ${parseErr.message}`;
      }
    }

    const duration = Date.now() - startTime;
    return {
      id: this.id,
      name: this.name,
      status,
      count: findings.length,
      duration,
      findings,
      rawOutput,
      error: errorMsg
    };
  }
}

module.exports = BaseAnalyzer;
