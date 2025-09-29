import { test, expect } from '@playwright/test';
import { StudentFormPage } from '../fixtures/pages/StudentFormPage';
import { StudentListPage } from '../fixtures/pages/StudentListPage';
import { StudentFactory } from '../fixtures/data/StudentFactory';

test.describe('Student Onboarding Flow', () => {

  test('should validate required fields', async ({ page }) => {
    const form = new StudentFormPage(page);
    await form.goto();
    await form.submit();
    await expect(form.getError('firstName')).toContainText('Required');
    await expect(form.getError('email')).toContainText('Required');
  });

  test('should create an adult student with minimal data', async ({ page }) => {
    const student = StudentFactory.adultMinimal();
    const form = new StudentFormPage(page);
    await form.goto();
    await form.fillForm(student);
    await form.submit();

    const list = new StudentListPage(page);
    await list.search(student.firstName);
    await expect(list.rowFor(student.firstName)).toBeVisible();
  });

  test('should create a child student linked to new family', async ({ page }) => {
    const student = StudentFactory.childWithNewParent();
    const form = new StudentFormPage(page);
    await form.goto();
    await form.fillForm(student);
    await form.submit();

    const list = new StudentListPage(page);
    await list.search(student.firstName);
    await expect(list.rowFor(student.firstName)).toBeVisible();
  });

  test('should persist student details after reload', async ({ page }) => {
    const student = StudentFactory.adultFull();
    const form = new StudentFormPage(page);
    await form.goto();
    await form.fillForm(student);
    await form.submit();

    await page.reload();
    const list = new StudentListPage(page);
    await list.search(student.email);
    await expect(list.rowFor(student.firstName)).toBeVisible();
  });

});
