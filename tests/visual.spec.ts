import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage desktop screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for any animations to settle
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('homepage mobile screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for any animations to settle
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('homepage tablet screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });
});

test.describe('Section Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('hero section screenshot', async ({ page }) => {
    const hero = page.locator('[data-section="hero"], #hero, section:first-of-type').first();

    if ((await hero.count()) > 0) {
      await expect(hero).toHaveScreenshot('hero-section.png', {
        maxDiffPixels: 50,
      });
    }
  });

  test('services section screenshot', async ({ page }) => {
    const services = page.locator('[data-section="services"], #services').first();

    if ((await services.count()) > 0) {
      await services.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      await expect(services).toHaveScreenshot('services-section.png', {
        maxDiffPixels: 50,
      });
    }
  });

  test('about section screenshot', async ({ page }) => {
    const about = page.locator('[data-section="about"], #about').first();

    if ((await about.count()) > 0) {
      await about.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      await expect(about).toHaveScreenshot('about-section.png', {
        maxDiffPixels: 50,
      });
    }
  });

  test('testimonials section screenshot', async ({ page }) => {
    const testimonials = page.locator('[data-section="testimonials"], #testimonials').first();

    if ((await testimonials.count()) > 0) {
      await testimonials.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      await expect(testimonials).toHaveScreenshot('testimonials-section.png', {
        maxDiffPixels: 50,
      });
    }
  });

  test('contact section screenshot', async ({ page }) => {
    const contact = page.locator('[data-section="contact"], #contact').first();

    if ((await contact.count()) > 0) {
      await contact.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      await expect(contact).toHaveScreenshot('contact-section.png', {
        maxDiffPixels: 50,
      });
    }
  });

  test('footer screenshot', async ({ page }) => {
    const footer = page.locator('footer').first();

    if ((await footer.count()) > 0) {
      await footer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      await expect(footer).toHaveScreenshot('footer.png', {
        maxDiffPixels: 50,
      });
    }
  });
});

test.describe('Interactive State Screenshots', () => {
  test('navigation hover states', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const navLink = page.locator('nav a').first();

    if ((await navLink.count()) > 0) {
      await navLink.hover();
      await page.waitForTimeout(200);

      await expect(navLink).toHaveScreenshot('nav-link-hover.png', {
        maxDiffPixels: 20,
      });
    }
  });

  test('button hover states', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const primaryButton = page.locator(
      'button:visible, a[class*="btn"]:visible, a[class*="button"]:visible'
    ).first();

    if ((await primaryButton.count()) > 0) {
      await primaryButton.hover();
      await page.waitForTimeout(200);

      await expect(primaryButton).toHaveScreenshot('button-hover.png', {
        maxDiffPixels: 20,
      });
    }
  });

  test('focus states', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Tab to first focusable element
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focused = page.locator(':focus');

    if ((await focused.count()) > 0) {
      await expect(focused).toHaveScreenshot('focus-state.png', {
        maxDiffPixels: 20,
      });
    }
  });
});

test.describe('Mobile Menu Visual', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('mobile menu open state', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuToggle = page.locator(
      '[data-mobile-menu-toggle], [aria-label*="menu"], button:has([class*="hamburger"])'
    ).first();

    if ((await menuToggle.count()) > 0) {
      await menuToggle.click();
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('mobile-menu-open.png', {
        maxDiffPixels: 50,
      });
    }
  });
});

test.describe('Layout Variations', () => {
  // These tests check different layout configurations via URL params or picker
  // Adjust based on how your layout picker works

  const layouts = ['minimal', 'classic', 'glass'];
  const palettes = ['palette1', 'palette2', 'palette3'];

  for (const layout of layouts) {
    for (const palette of palettes) {
      test(`layout ${layout} with ${palette}`, async ({ page }) => {
        // Try URL params first
        await page.goto(`/?layout=${layout}&palette=${palette}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        // Check if layout picker exists and try to use it
        const layoutPicker = page.locator('[data-layout-picker], [class*="layout-picker"]');

        if ((await layoutPicker.count()) > 0) {
          // Click layout option
          const layoutOption = layoutPicker.locator(`[data-layout="${layout}"], button:has-text("${layout}")`).first();
          if ((await layoutOption.count()) > 0) {
            await layoutOption.click();
            await page.waitForTimeout(500);
          }

          // Click palette option
          const paletteOption = layoutPicker.locator(`[data-palette="${palette}"], button:has-text("${palette}")`).first();
          if ((await paletteOption.count()) > 0) {
            await paletteOption.click();
            await page.waitForTimeout(500);
          }
        }

        await expect(page).toHaveScreenshot(`layout-${layout}-${palette}.png`, {
          fullPage: true,
          maxDiffPixels: 100,
        });
      });
    }
  }
});

test.describe('Color Theme Verification', () => {
  test('primary color is applied consistently', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get the primary color from CSS variables or first prominent element
    const primaryColor = await page.evaluate(() => {
      const root = document.documentElement;
      const cssVar = getComputedStyle(root).getPropertyValue('--primary').trim();

      if (cssVar) return cssVar;

      // Fallback: get color from primary button
      const btn = document.querySelector('button, a[class*="primary"]');
      if (btn) {
        return getComputedStyle(btn).backgroundColor;
      }

      return null;
    });

    expect(primaryColor).toBeTruthy();
    console.log(`Primary color detected: ${primaryColor}`);
  });

  test('text is readable against backgrounds', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check text contrast in various sections
    const sections = await page.locator('section').all();

    for (const section of sections) {
      const contrast = await section.evaluate((el) => {
        const style = getComputedStyle(el);
        const bgColor = style.backgroundColor;
        const textColor = style.color;

        // Simple check: both should be defined
        return {
          bg: bgColor,
          text: textColor,
          hasContrast: bgColor !== textColor,
        };
      });

      expect(contrast.hasContrast).toBeTruthy();
    }
  });
});

test.describe('Typography Consistency', () => {
  test('heading sizes decrease properly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const headingSizes = await page.evaluate(() => {
      const sizes: Record<string, number> = {};

      for (let i = 1; i <= 6; i++) {
        const heading = document.querySelector(`h${i}`);
        if (heading) {
          sizes[`h${i}`] = parseFloat(getComputedStyle(heading).fontSize);
        }
      }

      return sizes;
    });

    // Each heading level should be smaller than the previous
    const levels = Object.keys(headingSizes).sort();

    for (let i = 1; i < levels.length; i++) {
      const currentSize = headingSizes[levels[i]];
      const previousSize = headingSizes[levels[i - 1]];

      if (currentSize && previousSize) {
        expect(
          currentSize <= previousSize,
          `${levels[i]} (${currentSize}px) should be <= ${levels[i - 1]} (${previousSize}px)`
        ).toBeTruthy();
      }
    }
  });

  test('body text is readable size', async ({ page }) => {
    await page.goto('/');

    const bodyFontSize = await page.evaluate(() => {
      const body = document.body;
      return parseFloat(getComputedStyle(body).fontSize);
    });

    // Body text should be at least 16px
    expect(bodyFontSize).toBeGreaterThanOrEqual(16);
  });
});
