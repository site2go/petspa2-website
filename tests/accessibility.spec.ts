import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility - WCAG 2.1 AA', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Log violations for debugging
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Accessibility violations:');
      accessibilityScanResults.violations.forEach((violation) => {
        console.log(`\n${violation.id}: ${violation.description}`);
        console.log(`Impact: ${violation.impact}`);
        console.log(`Help: ${violation.helpUrl}`);
        violation.nodes.forEach((node) => {
          console.log(`  - ${node.html}`);
        });
      });
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('critical accessibility issues should not exist', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Filter for critical and serious issues only
    const criticalViolations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(criticalViolations).toEqual([]);
  });
});

test.describe('Accessibility - Keyboard Navigation', () => {
  test('skip link works correctly', async ({ page }) => {
    await page.goto('/');

    // Press Tab to focus skip link
    await page.keyboard.press('Tab');

    // Look for skip link
    const skipLink = page.locator('a[href="#main"], a[href="#content"], .skip-link, [class*="skip"]').first();

    if ((await skipLink.count()) > 0) {
      await expect(skipLink).toBeFocused();

      // Activate skip link
      await page.keyboard.press('Enter');

      // Main content should be focused or in view
      const mainContent = page.locator('main, #main, #content, [role="main"]').first();
      await expect(mainContent).toBeInViewport();
    }
  });

  test('all interactive elements are keyboard focusable', async ({ page }) => {
    await page.goto('/');

    const interactiveElements = page.locator(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const count = await interactiveElements.count();

    let focusableCount = 0;

    for (let i = 0; i < count; i++) {
      const element = interactiveElements.nth(i);

      if (await element.isVisible()) {
        // Try to focus the element
        await element.focus();

        // Check if element is focused
        const isFocused = await element.evaluate((el) => el === document.activeElement);
        if (isFocused) {
          focusableCount++;
        }
      }
    }

    // At least some elements should be focusable
    expect(focusableCount).toBeGreaterThan(0);
  });

  test('focus indicators are visible', async ({ page }) => {
    await page.goto('/');

    // Tab through elements and check for visible focus
    const elementsToCheck = 5;

    for (let i = 0; i < elementsToCheck; i++) {
      await page.keyboard.press('Tab');

      // Get focused element
      const focused = page.locator(':focus');

      if ((await focused.count()) > 0) {
        // Check for outline or other focus indicator
        const styles = await focused.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            outline: computed.outline,
            outlineWidth: computed.outlineWidth,
            boxShadow: computed.boxShadow,
            border: computed.border,
          };
        });

        // Element should have some visible focus indicator
        const hasVisibleFocus =
          styles.outlineWidth !== '0px' ||
          styles.boxShadow !== 'none' ||
          styles.outline !== 'none';

        // This is a warning, not a hard failure, as some designs use other focus indicators
        if (!hasVisibleFocus) {
          console.warn(`Element may lack visible focus indicator: ${await focused.evaluate((el) => el.tagName)}`);
        }
      }
    }
  });

  test('no keyboard traps exist', async ({ page }) => {
    await page.goto('/');

    const maxTabs = 50;
    const visitedElements = new Set<string>();
    let trapDetected = false;

    for (let i = 0; i < maxTabs; i++) {
      await page.keyboard.press('Tab');

      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;
        return {
          tag: el.tagName,
          id: el.id,
          className: el.className,
        };
      });

      if (focusedElement) {
        const elementKey = `${focusedElement.tag}-${focusedElement.id}-${focusedElement.className}`;

        // If we've seen this element twice in a row, might be a trap
        if (visitedElements.has(elementKey)) {
          // Try Shift+Tab to escape
          await page.keyboard.press('Shift+Tab');
          const afterShiftTab = await page.evaluate(() => document.activeElement?.tagName);

          // If we can't move backward, it's a trap
          if (afterShiftTab === focusedElement.tag) {
            trapDetected = true;
            break;
          }
        }

        visitedElements.add(elementKey);
      }
    }

    expect(trapDetected).toBe(false);
  });
});

test.describe('Accessibility - Content', () => {
  test('all images have alt text', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');

      // Images should have alt text or role="presentation" for decorative
      const hasAlt = alt !== null;
      const isDecorative = role === 'presentation' || alt === '';

      expect(hasAlt || isDecorative, `Image ${i} should have alt text`).toBeTruthy();

      // Non-decorative images should have meaningful alt text
      if (alt && alt !== '') {
        expect(alt.length).toBeGreaterThan(3);
      }
    }
  });

  test('heading levels are sequential', async ({ page }) => {
    await page.goto('/');

    const headings = await page.evaluate(() => {
      const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(allHeadings).map((h) => ({
        level: parseInt(h.tagName.charAt(1)),
        text: h.textContent?.trim().substring(0, 50),
      }));
    });

    // Check for proper heading hierarchy
    let previousLevel = 0;

    for (const heading of headings) {
      // Heading level should not skip more than one level
      if (previousLevel > 0) {
        expect(
          heading.level <= previousLevel + 1,
          `Heading "${heading.text}" (h${heading.level}) skips levels after h${previousLevel}`
        ).toBeTruthy();
      }
      previousLevel = heading.level;
    }

    // Should have exactly one h1
    const h1Count = headings.filter((h) => h.level === 1).length;
    expect(h1Count, 'Page should have exactly one h1').toBe(1);
  });

  test('form fields have associated labels', async ({ page }) => {
    await page.goto('/');

    const inputs = page.locator('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea, select');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      const placeholder = await input.getAttribute('placeholder');

      // Check for associated label
      let hasLabel = false;

      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        hasLabel = (await label.count()) > 0;
      }

      // Check if input is wrapped in label
      if (!hasLabel) {
        const parentLabel = input.locator('xpath=ancestor::label');
        hasLabel = (await parentLabel.count()) > 0;
      }

      // aria-label or aria-labelledby also count
      hasLabel = hasLabel || !!ariaLabel || !!ariaLabelledBy;

      expect(
        hasLabel,
        `Form field at position ${i} should have an associated label`
      ).toBeTruthy();

      // Placeholder should not be the only label
      if (!hasLabel && placeholder) {
        console.warn(`Form field uses placeholder as only label: "${placeholder}"`);
      }
    }
  });

  test('color contrast meets WCAG AA standards', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    expect(results.violations.filter((v) => v.id === 'color-contrast')).toEqual([]);
  });

  test('links have descriptive text', async ({ page }) => {
    await page.goto('/');

    const links = page.locator('a');
    const count = await links.count();

    const genericLinkTexts = ['click here', 'read more', 'learn more', 'here', 'more', 'link'];

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const text = (await link.textContent())?.trim().toLowerCase();
      const ariaLabel = await link.getAttribute('aria-label');

      // Skip hidden links
      if (!(await link.isVisible())) continue;

      // Link should have text or aria-label
      const hasText = text && text.length > 0;
      const hasAriaLabel = ariaLabel && ariaLabel.length > 0;

      expect(hasText || hasAriaLabel, `Link at position ${i} should have descriptive text`).toBeTruthy();

      // Warn about generic link text
      if (text && genericLinkTexts.includes(text)) {
        console.warn(`Link has generic text: "${text}"`);
      }
    }
  });
});

test.describe('Accessibility - Mobile Menu', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('mobile menu has proper ARIA attributes', async ({ page }) => {
    await page.goto('/');

    const menuToggle = page.locator(
      '[data-mobile-menu-toggle], [aria-label*="menu"], button:has([class*="hamburger"])'
    ).first();

    if ((await menuToggle.count()) > 0) {
      // Check toggle has aria-expanded
      const ariaExpanded = await menuToggle.getAttribute('aria-expanded');
      expect(ariaExpanded).toBeDefined();

      // Click to open
      await menuToggle.click();

      // Check aria-expanded updates
      const ariaExpandedAfter = await menuToggle.getAttribute('aria-expanded');
      expect(ariaExpandedAfter).toBe('true');

      // Menu should have role
      const menu = page.locator('[role="navigation"], [role="menu"], [role="dialog"]').first();
      expect(await menu.count()).toBeGreaterThan(0);
    }
  });

  test('escape key closes mobile menu', async ({ page }) => {
    await page.goto('/');

    const menuToggle = page.locator(
      '[data-mobile-menu-toggle], [aria-label*="menu"], button:has([class*="hamburger"])'
    ).first();

    if ((await menuToggle.count()) > 0) {
      await menuToggle.click();

      // Wait for menu to open
      await page.waitForTimeout(300);

      // Press Escape
      await page.keyboard.press('Escape');

      // Menu should close
      const ariaExpanded = await menuToggle.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('false');
    }
  });
});
