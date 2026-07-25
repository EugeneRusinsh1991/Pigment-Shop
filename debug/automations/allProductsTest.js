/**
 * All Products Page Automation (Alt + 5)
 */
import { delay } from '../utils/domHelpers';
import {
  initTaskState,
  adjustPriceInputs,
  toggleCheckboxByTestId,
  toggleCategoryCheckboxes,
  interactWithFirstProduct,
  resetFilterButton
} from './allProductsHelpers';

async function navigateWithCheck(router, path, delayMs, taskName, activeTaskRef) {
  router.push(path);
  await delay(delayMs);
  return activeTaskRef.current === taskName;
}

async function runFilterSteps(taskName, activeTaskRef) {
  await adjustPriceInputs();
  const filterList = [
    ['filter-instock', 'Step 3: In Stock'],
    ['filter-outofstock', 'Step 4: Out of Stock'],
    ['filter-onsale', 'Step 5: On Sale'],
    ['filter-isnew', 'Step 6: Is New'],
  ];
  for (const [id, label] of filterList) {
    if (activeTaskRef.current !== taskName) return false;
    await toggleCheckboxByTestId(id, label, taskName, activeTaskRef);
  }
  return activeTaskRef.current === taskName;
}

async function executeMainSteps(router, taskName, activeTaskRef) {
  if (!(await navigateWithCheck(router, '/', 1000, taskName, activeTaskRef))) return false;
  if (!(await navigateWithCheck(router, '/products', 1200, taskName, activeTaskRef))) return false;
  if (!(await runFilterSteps(taskName, activeTaskRef))) return false;

  await toggleCategoryCheckboxes(taskName, activeTaskRef);
  if (activeTaskRef.current !== taskName) return false;

  await interactWithFirstProduct(router, taskName, activeTaskRef);
  await resetFilterButton(taskName, activeTaskRef);
  return activeTaskRef.current === taskName;
}

export async function runAllProductsTest(activeTaskRef, router) {
  const taskInfo = initTaskState(activeTaskRef);
  if (!taskInfo) return;
  const { isUnified, taskName } = taskInfo;

  console.log('[Alt+5] Starting Alt+5 All Products Automation...');

  if (!(await executeMainSteps(router, taskName, activeTaskRef))) return;

  console.log('[Alt+5] Step 11: Returning to Home page...');
  router.push('/');
  await delay(800);

  console.log('[Alt+5] Alt+5 All Products automation completed successfully!');
  if (!isUnified) activeTaskRef.current = null;
}
