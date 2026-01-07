/**
 * Test Setup File
 * This file runs before all tests to set up the testing environment
 */

// Set test environment
process.env.NODE_ENV = "test";

// Global test configuration
global.testTimeout = 10000; // 10 seconds default timeout

// Setup and teardown hooks
beforeAll(async () => {
  // Global setup - runs once before all tests
  console.log("Starting test suite...");
});

afterAll(async () => {
  // Global teardown - runs once after all tests
  console.log("Test suite completed.");
});

// Helper functions for tests
global.testHelpers = {
  /**
   * Wait for a specified time
   * @param {number} ms - milliseconds to wait
   */
  wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  /**
   * Generate mock product data
   */
  mockProduct: () => ({
    id: "test-product-id",
    name: "Test Product",
    description: "Test product description",
    amount: 100,
    currency: "SAR",
    type: "ONE_OFF",
  }),

  /**
   * Generate mock payment link data
   */
  mockPaymentLink: () => ({
    id: "test-payment-link-id",
    name: "Test Payment Link",
    amount: 100,
    currency: "SAR",
  }),
};
