import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class StudentFormPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly parentDropdown: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#email');
    this.phone = page.locator('#phone');
    this.parentDropdown = page.locator('#parentSelect');
    this.submitBtn = page.locator('button:has-text("Save")');
  }

  async goto() {
    await this.page.goto('/Teacher/v2/en/students/add');
  }

  async fillForm(student: any) {
    await this.firstName.fill(student.firstName);
    await this.lastName.fill(student.lastName);
    await this.email.fill(student.email);
    if (student.phone) await this.phone.fill(student.phone);
    if (student.parentName) await this.parentDropdown.selectOption({ label: student.parentName });
  }

  async submit() {
    await this.submitBtn.click();
  }

  getError(field: string) {
    return this.page.locator(`[data-testid="${field}-error"]`);
  }
}
