import { test, expect } from '@playwright/test';
import { OPERATOR_EMAIL, signIn } from './helpers';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await signIn(page);
    await expect(page).toHaveURL('**/dashboard');
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.fill('input[type="email"]', 'wrong@example.com');
    await page.locator('input[type="password"]').nth(0).fill('wrongpass');
    const extra = page.locator('input[type="password"]').nth(1);
    if (await extra.count()) await extra.fill('wrongpass');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Operator email is')).toBeVisible();
  });

  test('should handle case-insensitive email', async ({ page }) => {
    await page.fill('input[type="email"]', OPERATOR_EMAIL.toUpperCase());
    const pws = page.locator('input[type="password"]');
    const n = await pws.count();
    await pws.nth(0).fill('nexas-test-2026');
    if (n > 1) await pws.nth(1).fill('nexas-test-2026');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('**/dashboard');
  });

  test('should handle whitespace in inputs', async ({ page }) => {
    await page.fill('input[type="email"]', `  ${OPERATOR_EMAIL}  `);
    const pws = page.locator('input[type="password"]');
    const n = await pws.count();
    await pws.nth(0).fill('  nexas-test-2026  ');
    if (n > 1) await pws.nth(1).fill('  nexas-test-2026  ');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('**/dashboard');
  });

  test('should persist session after refresh', async ({ page }) => {
    await signIn(page);
    await expect(page).toHaveURL('**/dashboard');
    await page.reload();
    await expect(page).toHaveURL('**/dashboard');
  });
});

test.describe('Protected Routes', () => {
  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');
    await expect(page).toHaveURL('**/login');
  });

  test('should redirect to dashboard after login', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await signIn(page);
    await expect(page).toHaveURL('**/dashboard');
  });
});

test.describe('Logout', () => {
  test('should logout and clear session', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await signIn(page);
    await expect(page).toHaveURL('**/dashboard');
    await page.click('button:has-text("Sign out")');
    await expect(page).toHaveURL('**/login');
  });
});
