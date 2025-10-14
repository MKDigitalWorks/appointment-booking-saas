import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test('should complete booking flow successfully', async ({ page }) => {
    // Navigate to demo booking page
    await page.goto('/demo');

    // Wait for page to load
    await expect(page.locator('h1')).toContainText('Demo Salon');

    // Step 1: Select service
    await page.click('[data-testid="service-haircut"]');
    await page.click('button:has-text("Next")');

    // Step 2: Select staff
    await page.click('[data-testid="staff-any"]');
    await page.click('button:has-text("Next")');

    // Step 3: Select date and time
    await page.click('[data-testid="date-tomorrow"]');
    await page.click('[data-testid="time-14:00"]');
    await page.click('button:has-text("Next")');

    // Step 4: Fill customer details
    await page.fill('[data-testid="customer-name"]', 'John Doe');
    await page.fill('[data-testid="customer-email"]', 'john@example.com');
    await page.fill('[data-testid="customer-phone"]', '+1234567890');
    await page.click('button:has-text("Next")');

    // Step 5: Payment (mock)
    await expect(page.locator('text=Booking Summary')).toBeVisible();
    await expect(page.locator('text=Haircut & Style')).toBeVisible();
    await expect(page.locator('text=€75.00')).toBeVisible();

    // Mock Stripe payment
    await page.click('button:has-text("Pay with Stripe")');
    
    // Should redirect to confirmation page
    await expect(page.locator('text=Booking Confirmed')).toBeVisible();
  });

  test('should show error for unavailable time slot', async ({ page }) => {
    await page.goto('/demo');
    
    // Try to book a time that's already taken
    await page.click('[data-testid="service-haircut"]');
    await page.click('button:has-text("Next")');
    await page.click('[data-testid="staff-any"]');
    await page.click('button:has-text("Next")');
    await page.click('[data-testid="date-today"]');
    await page.click('[data-testid="time-09:00"]');
    await page.click('button:has-text("Next")');

    // Should show error message
    await expect(page.locator('text=Time slot is no longer available')).toBeVisible();
  });
});
