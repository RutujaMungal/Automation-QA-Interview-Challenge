import { Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class StudentDetailsPage extends BasePage {
constructor(page: Page) {
super(page);
}


async waitForDetailsLoad() {
await this.page.waitForSelector('[data-testid="student-details"]');
}


async getFieldValue(label: string) {
const el = this.page.locator(`[data-label="${label}"] .value`);
await el.waitFor();
return await el.textContent() || '';
}


async getStatus() {
return (await this.getFieldValue('Status')).trim();
}


async linkFamily() {
await this.page.locator('button[data-testid="link-family"]').click();
}
}
