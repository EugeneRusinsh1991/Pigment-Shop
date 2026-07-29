#!/usr/bin/env node

process.argv.push('--low');
import('./regenerateDatabase.js');
