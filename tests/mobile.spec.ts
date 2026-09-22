import { test, expect, devices } from '@playwright/test';
import { signIn } from './helpers';

const MOBILE_DEVICES = [
  { name: 'iPhone 14', ...devices['iPhone 14'] },
  { name: 'Pixel 5', ...devices['Pixel 5'] },
  { name: 'iPad Pro', ...devices['iPad Pro'] },
];

MOBILE_DEVICES.forEach(device => {
  test.describe(`Mobile - ${device.name}`, () => {
    test.use({ ...device });

    test('should render login page on mobile', async ({ page }) => {
      await page.goto('http://localhost:5173/login');

      // Check viewport is mobile size
      const viewport = page.viewportSize();
      expect(viewport?.width).toBeLessThanOrEqual(1024);

      // Elements should be visible
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('should login on mobile', async ({ page }) => {
      await page.goto('http://localhost:5173/login');
      await signIn(page);
      await expect(page).toHaveURL('**/dashboard');
    });

    test('should display dashboard on mobile', async ({ page }) => {
      await page.goto('http://localhost:5173/login');
      await signIn(page);

      // Dashboard should be responsive
      await expect(page.locator('text=Dashboard')).toBeVisible();
    });

    test('should display agents list on mobile', async ({ page }) => {
      await page.goto('http://localhost:5173/login');
      await signIn(page);

      await page.goto('http://localhost:5173/agents');

      // Agents should be visible
      await expect(page.locator('text=77 SPECIALISED AI AGENTS')).toBeVisible();

      // Search should work
      const searchInput = page.locator('input[aria-label="Search agents by name, role, or tagline"]');
      await expect(searchInput).toBeVisible();
    });

    test('should handle touch interactions', async ({ page }) => {
      await page.goto('http://localhost:5173/login');
      await page.locator('input[type="password"]').nth(0).fill('nexas-test-2026');
      const extra = page.locator('input[type="password"]').nth(1);
      if (await extra.count()) await extra.fill('nexas-test-2026');

      // Tap (touch) the button instead of click
      const signInButton = page.locator('button[type="submit"]');
      await signInButton.tap();

      await expect(page).toHaveURL('**/dashboard');
    });

    test('should have touch-friendly button sizes', async ({ page }) => {
      await page.goto('http://localhost:5173/login');

      const button = page.locator('button[type="submit"]');
      const box = await button.boundingBox();

      // Buttons should be at least 44x44px (touch-friendly)
      expect(box?.height).toBeGreaterThanOrEqual(44);
    });

    test('should scroll content on mobile', async ({ page }) => {
      await page.goto('http://localhost:5173/login');
      await signIn(page);

      await page.goto('http://localhost:5173/agents');

      // Should be scrollable
      const mainContent = page.locator('main') || page.locator('div[style*="flex"]').first();
      await expect(mainContent).toBeVisible();
    });

    test('should have proper viewport meta tags', async ({ page }) => {
      await page.goto('http://localhost:5173');

      const viewportMeta = await page.getAttribute('meta[name="viewport"]', 'content');
      expect(viewportMeta).toContain('width=device-width');
      expect(viewportMeta).toContain('initial-scale=1');
    });

    test('should have theme color meta tag', async ({ page }) => {
      await page.goto('http://localhost:5173');

      const themeColor = await page.getAttribute('meta[name="theme-color"]', 'content');
      expect(themeColor).toBeTruthy();
    });

    test('should be installable as PWA', async ({ page }) => {
      await page.goto('http://localhost:5173');

      const manifestLink = await page.getAttribute('link[rel="manifest"]', 'href');
      expect(manifestLink).toBeTruthy();

      // Verify manifest exists
      const manifest = await page.goto(`http://localhost:5173${manifestLink}`);
      expect(manifest?.status()).toBe(200);
    });
  });
});

test.describe('Responsive Layout', () => {
  test('should adapt layout for small screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 }); // iPhone SE
    await page.goto('http://localhost:5173/login');

    const inputs = page.locator('input');
    const count = await inputs.count();

    // Should render all inputs even on small screen
    expect(count).toBeGreaterThan(0);
  });

  test('should adapt layout for tablets', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto('http://localhost:5173/login');

    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('should adapt layout for desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
    await page.goto('http://localhost:5173/login');

    await expect(page.locator('input[type="email"]')).toBeVisible();
  });
});
