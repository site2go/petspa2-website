module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      numberOfRuns: 3,
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready on',
      startServerReadyTimeout: 30000,
    },
    assert: {
      assertions: {
        // Performance - minimum 80
        'categories:performance': ['warn', { minScore: 0.8 }],

        // Accessibility - minimum 90
        'categories:accessibility': ['error', { minScore: 0.9 }],

        // Best Practices - minimum 85
        'categories:best-practices': ['warn', { minScore: 0.85 }],

        // SEO - minimum 95
        'categories:seo': ['error', { minScore: 0.95 }],

        // Specific accessibility checks
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        'button-name': 'error',

        // SEO specific checks
        'document-title': 'error',
        'meta-description': 'error',
        'viewport': 'error',

        // Performance specific checks
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
