import { type Page } from '@playwright/test';

export const OPERATOR_EMAIL = 'seanm@clearvisionai.co.za';
export const TEST_PASSWORD = 'nexas-test-2026';

export async function signIn(page: Page, password = TEST_PASSWORD) {
  await page.fill('input[type="email"]', OPERATOR_EMAIL);
  const pws = page.locator('input[type="password"]');
  const n = await pws.count();
  await pws.nth(0).fill(password);
  if (n > 1) await pws.nth(1).fill(password);
  await page.locator('button[type="submit"]').click();
}
