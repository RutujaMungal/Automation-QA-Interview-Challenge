import { expect } from '@playwright/test';

// Common assertions used by tests
export class ValidationHelpers {
static async assertRequiredError(page: any, fieldSelector: string) {
const error = page.locator(`${fieldSelector} + .field-error`);
await expect(error).toBeVisible();
}

static async assertEmailFormatError(page: any, selector: string) {
const err = page.locator(`${selector} + .field-error`);
await expect(err).toContainText(/email/i);
}
}
