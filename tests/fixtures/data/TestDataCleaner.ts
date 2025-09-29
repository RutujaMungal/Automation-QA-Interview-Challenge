import { Page } from '@playwright/test';


// Simple cleaner that calls the API to delete by email if the platform exposes such API.
// AI-assisted: Generated helper; adapt endpoint to your platform's admin API.
export class TestDataCleaner {
static async deleteStudentByEmail(page: Page, email: string) {
// try to call internal API - replace with real endpoint or UI cleanup
const base = process.env.MMS_API_URL || process.env.MMS_SCHOOL_URL || '';
if (!base) return;
try {
await page.request.delete(`${base}/api/test-utils/students`, { data: { email } });
} catch (e) {
// fallback: log and ignore; a better implementation would remove via UI
console.warn('Cleanup failed for', email, e);
}
}
}
