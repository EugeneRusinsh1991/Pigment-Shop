import { runUIExplorer } from './index';

(async () => {
  console.log('--- Starting Event-Driven Universal UI Explorer ---');
  const report = await runUIExplorer();
  console.log('--- Universal UI Explorer Completed ---');
  console.log('Report generated in memory:');
  console.log(JSON.stringify(report, null, 2));
})();
