import { Page } from '@playwright/test';

export class BasePage {
constructor(protected page: Page) {}

async navigate(path: string) {
const base = process.env.MMS_SCHOOL_URL || process.env.BASE_URL || 'http://localhost:3000';
await this.page.goto(base + path);
}

async waitForLoad() {
await this.page.waitForLoadState('networkidle');
}

async screenshot(name: string) {
await this.page.screenshot({ path: `reports/screenshots/${name}.png`, fullPage: true });
}

locator(selector: string) {
return this.page.locator(selector);
}
}
