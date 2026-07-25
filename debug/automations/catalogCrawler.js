import { delay } from '../utils/domHelpers';
import {
  initCrawlerTask,
  interactWithProductCards,
  navigateDeeper,
  scrollLeafPage,
  backtrackBreadcrumbs,
  openFirstProductDetail
} from './crawlerHelpers';

async function executeCrawlerSteps(router, activeTaskRef) {
  const visitedCategoryHrefs = new Set();

  router.push('/');
  await delay(1000);
  if (activeTaskRef.current !== 'crawler') return false;

  router.push('/catalog');
  await delay(1200);
  visitedCategoryHrefs.add('/catalog');

  await navigateDeeper(visitedCategoryHrefs, activeTaskRef);
  if (activeTaskRef.current !== 'crawler') return false;

  await scrollLeafPage();
  if (activeTaskRef.current !== 'crawler') return false;

  const productLinks = await interactWithProductCards(activeTaskRef);
  if (activeTaskRef.current !== 'crawler') return false;

  await openFirstProductDetail(productLinks);
  if (activeTaskRef.current !== 'crawler') return false;

  await backtrackBreadcrumbs(router, activeTaskRef);
  return true;
}

export async function runCatalogCrawler(activeTaskRef, router) {
  if (!initCrawlerTask(activeTaskRef)) return;

  console.log('[Alt+3] Starting Catalog Crawler...');

  if (!(await executeCrawlerSteps(router, activeTaskRef))) return;

  if (window.location.pathname !== '/') {
    router.push('/');
  }

  console.log('[Alt+3] Catalog crawler completed successfully!');
  activeTaskRef.current = null;
}
