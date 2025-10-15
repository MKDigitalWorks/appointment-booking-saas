import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
  test('Home page renders', async ({ page }) => {
    const res = await page.goto('/');
    expect(res?.ok()).toBeTruthy();
    await expect(page.locator('body')).toBeVisible();
  });

  test('Booking page (optional) renders if present', async ({ page }) => {
    const res = await page.goto('/book');
    if (!res || res.status() >= 400) {
      test.info().annotations.push({ type: 'note', description: '/book not found — skipping (OK for MVP)' });
      test.skip();
    } else {
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('Stripe button (optional) visible if present', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('[data-testid="stripe-pay-button"]');
    if (await btn.count()) {
      await expect(btn).toBeVisible();
    } else {
      test.info().annotations.push({ type: 'note', description: 'stripe-pay-button not found — skipping (OK for now)' });
      test.skip();
    }
  });
});
