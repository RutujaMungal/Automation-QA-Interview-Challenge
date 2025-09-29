
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class StudentListPage extends BasePage {
searchInput = (q = '') => this.page.locator('input[data-testid="student-search"]');
listRows = () => this.page.locator('[data-testid="student-row"]');


async gotoList() {
await this.navigate('/Teacher/v2/en/students');
await this.waitForLoad();
}


async searchByName(name: string) {
const input = this.searchInput();
await input.fill(name);
await input.press('Enter');
await this.page.waitForResponse(resp => resp.url().includes('/students') && resp.status() === 200);
}


async findStudentRow(nameOrEmail: string) {
return this.page.locator(`[data-testid="student-row"] >> text="${nameOrEmail}"`).first();
}


async openStudentDetailsByRow(rowLocator: any) {
await rowLocator.locator('a[data-testid="student-link"]').click();
await this.page.waitForURL('**/students/details**');
}
}
