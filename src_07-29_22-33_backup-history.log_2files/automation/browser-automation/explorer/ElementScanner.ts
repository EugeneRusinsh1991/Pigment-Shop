import { IWebPage, IWebElement } from './driver/DriverInterfaces';
import { ElementMetadata } from './observability/events';
import { evaluateDomHash, evaluateScanPage } from './elementScannerEvaluators';

export interface ScannedElement {
  index: number;
  identifier: string;
  locator: IWebElement;
  metadata: ElementMetadata;
}

const SELECTABLE_ELEMENTS_QUERY =
  'button, a, input, select, textarea, [role="button"], [role="link"], [role="tab"], [role="menuitem"], [role="checkbox"], [role="radio"], [data-testid], [tabindex], [class*="r-cursor"], [style*="cursor"]';

export class ElementScanner {
  async checkDomHash(page: IWebPage): Promise<string> {
    return page.evaluate(evaluateDomHash, SELECTABLE_ELEMENTS_QUERY).catch((err) => {
      console.error('--- BROWSER AUTOMATION EXCEPTION (checkDomHash) ---', err.name, err.message);
      throw err;
    });
  }

  async scanPage(page: IWebPage): Promise<ScannedElement[]> {
    const results = await page.evaluate(evaluateScanPage, SELECTABLE_ELEMENTS_QUERY).catch((err) => {
      console.error('--- BROWSER AUTOMATION EXCEPTION (scanPage) ---', err.name, err.message);
      throw err;
    });

    const pageLocators = page.locator(SELECTABLE_ELEMENTS_QUERY);
    return results.map(r => ({
      index: r.index,
      identifier: r.identifier,
      locator: pageLocators.nth(r.index),
      metadata: r.metadata as ElementMetadata
    }));
  }

  // Legacy methods strictly for backward compatibility
  async findInteractiveElements(page: IWebPage): Promise<IWebElement[]> {
    const scanned = await this.scanPage(page);
    return scanned.map(s => s.locator);
  }

  async getElementIdentifier(locator: IWebElement): Promise<string> {
    // Legacy fallback interface
    return 'detached-element';
  }
}
