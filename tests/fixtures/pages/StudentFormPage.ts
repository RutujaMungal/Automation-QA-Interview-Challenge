import { Page, Locator } from '@playwright/test';
this.isChildToggle = this.page.locator('input[name="isChild"]');
this.parentSearch = this.page.locator('input[name="parentSearch"]');
this.createFamilyButton = this.page.locator('button[data-testid="create-family"]');
this.submitButton = this.page.locator('button[type="submit"], button[data-testid="save-student"]');
}


async goToAddStudent() {
await this.navigate('/Teacher/v2/en/students/add');
await this.waitForLoad();
}


async fillBasicInfo({ firstName, lastName, email, phone, dob }: any) {
if (firstName) await this.firstName.fill(firstName);
if (lastName) await this.lastName.fill(lastName);
if (email) await this.email.fill(email);
if (phone) await this.phone.fill(phone);
if (dob) await this.dob.fill(dob);
}


async markAsChild() {
if (!(await this.isChildToggle.isChecked())) await this.isChildToggle.check();
}


async linkToExistingParent(parentEmailOrName: string) {
await this.parentSearch.fill(parentEmailOrName);
// wait for suggestions and pick first
const suggestion = this.page.locator('.parent-suggestion').first();
await suggestion.waitFor();
await suggestion.click();
}


async createNewFamily(parentAttrs: { firstName: string; lastName: string; email: string; phone?: string }) {
await this.createFamilyButton.click();
// assume modal opens
await this.page.locator('input[name="familyFirstName"]').fill(parentAttrs.firstName);
await this.page.locator('input[name="familyLastName"]').fill(parentAttrs.lastName);
await this.page.locator('input[name="familyEmail"]').fill(parentAttrs.email);
if (parentAttrs.phone) await this.page.locator('input[name="familyPhone"]').fill(parentAttrs.phone);
await this.page.locator('button[data-testid="save-family"]').click();
// wait until modal closes
await this.page.locator('button[data-testid="save-family"]').waitFor({ state: 'detached' });
}


async submit() {
await Promise.all([
this.page.waitForResponse(response => response.url().includes('/students') && response.status() < 400),
this.submitButton.click(),
]);
}


async getValidationErrors() {
const items = await this.page.locator('.field-error').allTextContents();
return items;
}
}
