import { Page } from 'playwright';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { setupManualInspector: setupJS } = require('./setupManualInspectorCore.js');

export async function setupManualInspector(page: Page): Promise<void> {
  return setupJS(page);
}
