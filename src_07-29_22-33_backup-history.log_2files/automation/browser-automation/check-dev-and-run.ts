import { spawn } from 'child_process';
import * as net from 'net';

const DEV_PORT = 8081;
const DEV_HOST = 'localhost';

function isPortInUse(port: number, host: string): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', () => {
      resolve(true); // Port is in use
    });
    
    server.once('listening', () => {
      server.once('close', () => {
        resolve(false); // Port is available
      });
      server.close();
    });
    
    server.listen(port, host);
  });
}

async function startDevServer() {
  console.log('🚀 Starting dev server in background...');
  const devProc = spawn('npm', ['run', 'dev'], {
    cwd: process.cwd(),
    stdio: 'ignore',
    shell: true,
    detached: true,
    windowsHide: true
  });
  
  devProc.unref();
  
  // Wait for dev server to start
  console.log('⏳ Waiting for dev server to be ready...');
  let attempts = 0;
  const maxAttempts = 30;
  
  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const isRunning = await isPortInUse(DEV_PORT, DEV_HOST);
    if (isRunning) {
      console.log('✅ Dev server is ready!');
      return;
    }
    attempts++;
  }
  
  console.log('⚠️ Dev server did not start in time, proceeding anyway...');
}

async function runAutomation(task: string) {
  console.log(`🔧 Running automation: ${task}`);
  const proc = spawn('npx', ['tsx', task], {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true,
    windowsHide: true
  });
  
  await new Promise<void>((resolve) => {
    proc.on('close', (code) => {
      console.log(`✅ Automation completed with code ${code}`);
      resolve();
    });
  });
}

async function runAdminAndGuestSequential() {
  console.log('🔧 Running Admin automation...');
  await runAutomation('.tools/automation/browser-automation/run-admin-nav.ts');
  
  console.log('🔧 Running Guest automation...');
  await runAutomation('.tools/automation/browser-automation/run-smoke-guest.ts');
  
  console.log('✅ Both automations completed');
}

async function runPlaywrightBrowser(url: string) {
  console.log(`🌐 Opening Playwright browser: ${url}`);
  const proc = spawn('node', ['scripts/open-playwright.js', url], {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true
  });
  
  await new Promise<void>((resolve) => {
    proc.on('close', (code) => {
      console.log(`✅ Browser automation completed with code ${code}`);
      resolve();
    });
  });
}

async function main() {
  const command = process.argv[2];
  
  if (!command) {
    console.error('❌ No command specified');
    process.exit(1);
  }
  
  // Check if dev server is running
  const isDevRunning = await isPortInUse(DEV_PORT, DEV_HOST);
  
  if (!isDevRunning) {
    await startDevServer();
  } else {
    console.log('✅ Dev server is already running');
  }
  
  // Execute the requested command
  switch (command) {
    case 'admin-guest':
      await runAdminAndGuestSequential();
      break;
    case 'headless':
      await runAutomation('.tools/automation/browser-automation/run-smoke-both-headless.ts');
      break;
    case 'playwright':
      await runPlaywrightBrowser('http://localhost:8081');
      break;
    default:
      console.error(`❌ Unknown command: ${command}`);
      process.exit(1);
  }
}

main().catch(console.error);
