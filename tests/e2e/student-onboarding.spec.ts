import { test, expect } from '@playwright/test';
import { StudentFormPage } from '../fixtures/pages/StudentFormPage';
import { StudentListPage } from '../fixtures/pages/StudentListPage';
import { StudentDetailsPage } from '../fixtures/pages/StudentDetailsPage';
import { StudentFactory } from '../fixtures/data/StudentFactory';
import { TestDataCleaner } from '../fixtures/data/TestDataCleaner';

test.describe('Student Onboarding - Core flows', () => {test('Adult student minimal data -> appears in list and details', async ({ page }) => {
const form = new StudentFormPage(page);
const list = new StudentListPage(page);
const details = new StudentDetailsPage(page);
  
const student = StudentFactory.generateAdult({ email: `test.adult.${Date.now()}@example.com`, firstName: 'Rohit', lastName: 'Test' });

await form.goToAddStudent();
await form.fillBasicInfo(student);
await form.submit();
  
// Verify toast / success - try capturing server response
await list.gotoList();
await list.searchByName(student.email);
const row = await list.findStudentRow(student.email);
await expect(row).toBeVisible();
await list.openStudentDetailsByRow(row);
await details.waitForDetailsLoad();
await expect(await details.getFieldValue('Email')).toContain(student.email);

// cleanup
await TestDataCleaner.deleteStudentByEmail(page, student.email);
});
                                                        
test('Child student with new family -> creates family and links', async ({ page }) => {
const form = new StudentFormPage(page);
const list = new StudentListPage(page);
const details = new StudentDetailsPage(page);
  
const child = StudentFactory.generateChild({ email: `test.child.${Date.now()}@example.com` });
const parent = { firstName: 'Parent', lastName: `Test${Date.now()}`, email: `parent.${Date.now()}@example.com` };

await form.goToAddStudent();
await form.markAsChild();
await form.fillBasicInfo(child);
await form.createNewFamily(parent);
await form.submit();

await list.gotoList();
await list.searchByName(child.email);
const row = await list.findStudentRow(child.email);
await expect(row).toBeVisible();

await list.openStudentDetailsByRow(row);
await details.waitForDetailsLoad();
await expect(await details.getFieldValue('Family Email')).toContain(parent.email);

// cleanup
await TestDataCleaner.deleteStudentByEmail(page, child.email);
await TestDataCleaner.deleteStudentByEmail(page, parent.email);
});
                                                        
test('Validation: required fields and email format', async ({ page }) => { 
const form = new StudentFormPage(page); 
await form.goToAddStudent();

// submit empty
await form.submit();
const errors = await form.getValidationErrors();
expect(errors.length).toBeGreaterThan(0);

// invalid email
await form.fillBasicInfo({ firstName: 'A', lastName: 'B', email: 'bad email' });
await form.submit();
const errs2 = await form.getValidationErrors();
expect(errs2.some(e => /email/i.test(e))).toBeTruthy();
});
});

