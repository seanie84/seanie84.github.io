import { test, expect } from '@playwright/test';
import { signIn } from './helpers';

test.describe('Agent Directory', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('http://localhost:5173/login');
    await signIn(page);
    await page.goto('http://localhost:5173/agents');
  });

  test('should display all agents', async ({ page }) => {
    await expect(page.locator('text=77 SPECIALISED AI AGENTS')).toBeVisible();
    const agents = await page.locator('[role="button"][aria-label*=","]').count();
    expect(agents).toBeGreaterThan(0);
  });

  test('should search agents', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search agents by name, role, or tagline"]');
    await searchInput.fill('NEXA');

    // Should filter agents
    const filteredAgents = await page.locator('[role="button"][aria-label*="NEXA"]').count();
    expect(filteredAgents).toBeGreaterThan(0);
  });

  test('should filter by category', async ({ page }) => {
    const categorySelect = page.locator('select[aria-label="Filter agents by category"]');
    await categorySelect.selectOption('core');

    // Should show filtered agents
    const agents = await page.locator('[role="button"][aria-label*=","]').count();
    expect(agents).toBeGreaterThan(0);
  });

  test('should toggle view modes', async ({ page }) => {
    const gridButton = page.locator('button[aria-label="Switch to grid view"]');
    const listButton = page.locator('button[aria-label="Switch to list view"]');

    // Switch to list
    await listButton.click();
    await expect(listButton).toHaveAttribute('aria-pressed', 'true');

    // Switch to grid
    await gridButton.click();
    await expect(gridButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('should open agent details modal', async ({ page }) => {
    const firstAgent = page.locator('[role="button"][aria-label*=","]').first();
    await firstAgent.click();

    // Modal should be visible
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });

  test('should close modal with close button', async ({ page }) => {
    const firstAgent = page.locator('[role="button"][aria-label*=","]').first();
    await firstAgent.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    const closeButton = page.locator('button[aria-label*="Close"]');
    await closeButton.click();

    // Modal should be hidden
    const modal = page.locator('[role="dialog"]');
    await expect(modal).not.toBeVisible();
  });

  test('should close modal when clicking outside', async ({ page }) => {
    const firstAgent = page.locator('[role="button"][aria-label*=","]').first();
    await firstAgent.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Click outside the modal
    await page.click('[role="presentation"]');

    // Modal should be hidden
    const modal = page.locator('[role="dialog"]');
    await expect(modal).not.toBeVisible();
  });
});

test.describe('Agent Directory - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await signIn(page);
    await page.goto('http://localhost:5173/agents');
  });

  test('should have proper ARIA labels', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search agents by name, role, or tagline"]');
    const categorySelect = page.locator('select[aria-label="Filter agents by category"]');

    await expect(searchInput).toHaveAttribute('aria-label', /Search agents/);
    await expect(categorySelect).toHaveAttribute('aria-label', /Filter agents/);
  });

  test('should support keyboard navigation', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search agents by name, role, or tagline"]');

    // Focus and interact with keyboard
    await searchInput.focus();
    await searchInput.type('NEXA');
    await page.keyboard.press('Tab');

    // Should move to next element
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
    expect(focused).toBeTruthy();
  });
});
