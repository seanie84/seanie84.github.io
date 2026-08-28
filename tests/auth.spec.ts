import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('input[type="email"]', 'Nexa@clearvision-ai.co.za');
    await page.fill('input[type="password"]', 'nexa2024');
    await page.click('button:has-text("Sign In")');
    await expect(page).toHaveURL('**/dashboard');
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.fill('input[type="email"]', 'wrong@example.com');
    await page.fill('input[type="password"]', 'wrongpass');
    await page.click('button:has-text("Sign In")');
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('should handle case-insensitive email', async ({ page }) => {
    await page.fill('input[type="email"]', 'NEXA@CLEARVISION-AI.CO.ZA');
    await page.fill('input[type="password"]', 'nexa2024');
    await page.click('button:has-text("Sign In")');
    await expect(page).toHaveURL('**/dashboard');
  });

  test('should handle whitespace in inputs', async ({ page }) => {
    await page.fill('input[type="email"]', '  Nexa@clearvision-ai.co.za  ');
    await page.fill('input[type="password"]', '  nexa2024  ');
    await page.click('button:has-text("Sign In")');
    await expect(page).toHaveURL('**/dashboard');
  });

  test('should persist session after refresh', async ({ page }) => {
    // Login
    await page.fill('input[type="email"]', 'Nexa@clearvision-ai.co.za');
    await page.fill('input[type="password"]', 'nexa2024');
    await page.click('button:has-text("Sign In")');
    await expect(page).toHaveURL('**/dashboard');

    // Refresh
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
    await page.fill('input[type="email"]', 'Nexa@clearvision-ai.co.za');
    await page.fill('input[type="password"]', 'nexa2024');
    await page.click('button:has-text("Sign In")');
    await expect(page).toHaveURL('**/dashboard');
  });
});

test.describe('Logout', () => {
  test('should logout and clear session', async ({ page }) => {
    // Login first
    await page.goto('http://localhost:5173/login');
    await page.fill('input[type="email"]', 'Nexa@clearvision-ai.co.za');
    await page.fill('input[type="password"]', 'nexa2024');
    await page.click('button:has-text("Sign In")');
    await expect(page).toHaveURL('**/dashboard');

    // Logout
    await page.click('button:has-text("Sign Out")');
    await expect(page).toHaveURL('**/login');
  });
});
