import { Page } from 'playwright';

export interface ScreenshotService {
  captureFailure(page: Page, screenName: string, errorType: string): Promise<string | null>;
}
