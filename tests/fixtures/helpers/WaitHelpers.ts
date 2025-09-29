import { Page } from '@playwright/test';


// AI-assisted: Smart wait helpers to avoid hard-coded waits
export class WaitHelpers {
static async waitForApi(page: Page, urlPart: string, timeout = 30000) {
await page.waitForResponse(resp => resp.url().includes(urlPart) && resp.status() < 500, { timeout });
}


static async waitForElement(page: Page, selector: string, timeout = 30000) {
await page.locator(selector).waitFor({ state: 'visible', timeout });
}
}
