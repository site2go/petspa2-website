import { test, expect } from '@playwright/test';

test.describe('Website Core Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads successfully with HTTP 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('no console errors on page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known acceptable errors (like favicon 404 in dev)
    const criticalErrors = errors.filter(
      (err) => !err.includes('favicon') && !err.includes('404')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('all main sections are visible', async ({ page }) => {
    // Hero section
    const hero = page.locator('[data-section="hero"], #hero, section:first-of-type');
    await expect(hero).toBeVisible();

    // Services section
    const services = page.locator('[data-section="services"], #services, [id*="service"]');
    await expect(services).toBeVisible();

    // About section
    const about = page.locator('[data-section="about"], #about, [id*="about"]');
    await expect(about).toBeVisible();

    // Testimonials section
    const testimonials = page.locator('[data-section="testimonials"], #testimonials, [id*="testimonial"]');
    await expect(testimonials).toBeVisible();

    // Contact section
    const contact = page.locator('[data-section="contact"], #contact, [id*="contact"]');
    await expect(contact).toBeVisible();

    // Footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('navigation links scroll to correct sections', async ({ page }) => {
    // Get all navigation links
    const navLinks = page.locator('nav a[href^="#"]');
    const linkCount = await navLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');

      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetSection = page.locator(`#${targetId}`);

        // Only test if target exists
        if ((await targetSection.count()) > 0) {
          await link.click();

          // Wait for scroll animation
          await page.waitForTimeout(500);

          // Check if section is in viewport
          await expect(targetSection).toBeInViewport();
        }
      }
    }
  });

  test('primary CTA button is visible and clickable', async ({ page }) => {
    const primaryCTA = page.locator(
      'a[href="#contact"], button:has-text("Contact"), a:has-text("Book"), button:has-text("Book"), [data-cta="primary"]'
    ).first();

    await expect(primaryCTA).toBeVisible();
    await expect(primaryCTA).toBeEnabled();
  });

  test('images load correctly', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');

      // Skip placeholder images or data URLs
      if (src && !src.startsWith('data:') && !src.includes('placeholder')) {
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        expect(naturalWidth, `Image ${src} should load`).toBeGreaterThan(0);
      }
    }
  });

  test('phone links are formatted correctly', async ({ page }) => {
    const phoneLinks = page.locator('a[href^="tel:"]');
    const count = await phoneLinks.count();

    for (let i = 0; i < count; i++) {
      const link = phoneLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toMatch(/^tel:\+?[\d\s-()]+$/);
    }
  });

  test('email links are formatted correctly', async ({ page }) => {
    const emailLinks = page.locator('a[href^="mailto:"]');
    const count = await emailLinks.count();

    for (let i = 0; i < count; i++) {
      const link = emailLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toMatch(/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    }
  });
});

test.describe('Mobile Viewport', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const body = page.locator('body');
    const bodyWidth = await body.evaluate((el) => el.scrollWidth);
    const viewportWidth = 375;

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.goto('/');

    // Look for common mobile menu toggle buttons
    const menuToggle = page.locator(
      '[data-mobile-menu-toggle], [aria-label*="menu"], button:has([class*="hamburger"]), button[class*="mobile"]'
    ).first();

    // If mobile menu toggle exists
    if ((await menuToggle.count()) > 0) {
      await menuToggle.click();

      // Check if mobile menu is visible
      const mobileMenu = page.locator(
        '[data-mobile-menu], [role="dialog"], nav[class*="mobile"], [class*="mobile-menu"]'
      ).first();

      if ((await mobileMenu.count()) > 0) {
        await expect(mobileMenu).toBeVisible();

        // Close menu
        const closeButton = page.locator(
          '[data-mobile-menu-close], [aria-label*="close"], button:has([class*="close"])'
        ).first();

        if ((await closeButton.count()) > 0) {
          await closeButton.click();
          await expect(mobileMenu).not.toBeVisible();
        }
      }
    }
  });

  test('touch targets are at least 44x44 pixels', async ({ page }) => {
    await page.goto('/');

    const interactiveElements = page.locator('button, a, input, [role="button"]');
    const count = await interactiveElements.count();

    for (let i = 0; i < count; i++) {
      const element = interactiveElements.nth(i);
      const box = await element.boundingBox();

      if (box && await element.isVisible()) {
        // Allow some elements to be smaller if they're part of larger touch targets
        const minSize = 44;
        const isTooSmall = box.width < minSize && box.height < minSize;

        if (isTooSmall) {
          // Check if parent is large enough
          const parentBox = await element.locator('..').boundingBox();
          if (parentBox) {
            expect(
              parentBox.width >= minSize || parentBox.height >= minSize,
              `Element at position ${i} should have adequate touch target size`
            ).toBeTruthy();
          }
        }
      }
    }
  });
});

test.describe('SEO Essentials', () => {
  test('has valid meta title', async ({ page }) => {
    await page.goto('/');

    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThanOrEqual(30);
    expect(title.length).toBeLessThanOrEqual(70);
  });

  test('has meta description', async ({ page }) => {
    await page.goto('/');

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    const content = await metaDescription.getAttribute('content');
    expect(content?.length).toBeGreaterThanOrEqual(100);
    expect(content?.length).toBeLessThanOrEqual(160);
  });

  test('has Open Graph tags', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', /.+/);
  });

  test('has structured data', async ({ page }) => {
    await page.goto('/');

    const structuredData = page.locator('script[type="application/ld+json"]');
    expect(await structuredData.count()).toBeGreaterThan(0);

    const jsonContent = await structuredData.first().textContent();
    expect(() => JSON.parse(jsonContent || '{}')).not.toThrow();
  });

  test('has canonical URL', async ({ page }) => {
    await page.goto('/');

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /.+/);
  });
});

test.describe('Performance Basics', () => {
  test('page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // DOM content loaded should be under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('no large layout shifts after load', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait a bit for any late layout shifts
    await page.waitForTimeout(1000);

    // Take a snapshot of positions
    const heroPosition = await page.locator('[data-section="hero"], #hero, section:first-of-type').first().boundingBox();

    // Wait and check again
    await page.waitForTimeout(500);

    const heroPositionAfter = await page.locator('[data-section="hero"], #hero, section:first-of-type').first().boundingBox();

    if (heroPosition && heroPositionAfter) {
      // Position should not change significantly
      expect(Math.abs((heroPosition.y || 0) - (heroPositionAfter.y || 0))).toBeLessThan(10);
    }
  });
});
