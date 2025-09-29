import { BasePage } from './BasePage';

export class StudentFormPage extends BasePage {
  readonly firstName = this.page.locator('[data-sb-qa="student-input-first-name"]');
  readonly lastName = this.page.locator('[data-sb-qa="student-input-last-name"]');
  readonly email = this.page.locator('[data-sb-qa="student-input-email"]');
  readonly phone = this.page.locator('[data-sb-qa="student-input-phone"]');
  readonly smsCapable = this.page.locator('[data-sb-qa="student-checkbox-sms"]');
  readonly studentTypeAdult = this.page.locator('[data-sb-qa="student-type-adult"]');
  readonly studentTypeChild = this.page.locator('[data-sb-qa="student-type-child"]');
  readonly newFamily = this.page.locator('[data-sb-qa="family-new"]');
  readonly existingFamily = this.page.locator('[data-sb-qa="family-existing"]');
  readonly parentFirstName = this.page.locator('[data-sb-qa="parent-first-name"]');
  readonly parentLastName = this.page.locator('[data-sb-qa="parent-last-name"]');
  readonly parentEmail = this.page.locator('[data-sb-qa="parent-email"]');
  readonly saveBtn = this.page.locator('[data-sb-qa="student-btn-save"]');

  async enterStudentBasic(firstName: string, lastName: string, email?: string, phone?: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    if (email) await this.email.fill(email);
    if (phone) await this.phone.fill(phone);
  }

  async selectStudentType(type: 'Adult' | 'Child') {
    if (type === 'Adult') await this.studentTypeAdult.click();
    else await this.studentTypeChild.click();
  }

  async selectFamily(option: 'New' | 'Existing') {
    if (option === 'New') await this.newFamily.click();
    else await this.existingFamily.click();
  }

  async enterParentDetails(firstName: string, lastName: string, email: string) {
    await this.parentFirstName.fill(firstName);
    await this.parentLastName.fill(lastName);
    await this.parentEmail.fill(email);
  }

  async saveStudent() {
    await this.saveBtn.click();
  }
}
