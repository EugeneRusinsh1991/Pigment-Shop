/**
 * Product Detail Page Automation (Alt + 4)
 */
import { delay } from '../utils/domHelpers';
import {
  clickElement,
  findFirstProductLink,
  adjustProductQuantity,
  interactProductDetailButtons
} from './productPageHelpers';

function isTaskActive(activeTaskRef) {
  return activeTaskRef.current === 'product_page_test';
}

function cancelOrStartTask(activeTaskRef) {
  if (isTaskActive(activeTaskRef)) {
    console.log('[Alt+4] Canceling Product Page test...');
    activeTaskRef.current = null;
    return false;
  }
  activeTaskRef.current = 'product_page_test';
  return true;
}

async function navigateAndOpenProduct(activeTaskRef, router) {
  router.push('/');
  await delay(1000);
  if (!isTaskActive(activeTaskRef)) return false;

  const firstProduct = await findFirstProductLink(router);
  if (!firstProduct) {
    console.error('[Alt+4] No product cards found.');
    activeTaskRef.current = null;
    return false;
  }

  console.log(`[Alt+4] Step 2: Opening first product -> ${firstProduct.getAttribute('href')}`);
  clickElement(firstProduct);
  await delay(1500);
  return isTaskActive(activeTaskRef);
}

export async function runProductPageTest(activeTaskRef, router) {
  if (!cancelOrStartTask(activeTaskRef)) return;

  console.log('[Alt+4] Starting Product Detail Page Test (Alt + 4)...');
  const opened = await navigateAndOpenProduct(activeTaskRef, router);
  if (!opened) return;

  await adjustProductQuantity(activeTaskRef);
  if (!isTaskActive(activeTaskRef)) return;

  await interactProductDetailButtons(activeTaskRef);
  if (!isTaskActive(activeTaskRef)) return;

  console.log('[Alt+4] Step 6: Returning to Home Page...');
  router.push('/');
  await delay(800);

  console.log('[Alt+4] Product Page Test completed successfully!');
  activeTaskRef.current = null;
}
