# Tests

This directory contains all tests for the Stream Express SDK Demo application.

## Structure

```
tests/
├── unit/           # Unit tests - test individual functions/methods in isolation
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── utils/
├── integration/    # Integration tests - test multiple components working together
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── utils/
└── e2e/           # End-to-end tests - test complete user flows
    ├── controllers/
    ├── services/
    ├── routes/
    └── utils/
```

## Test Types

### Unit Tests

- Test individual functions, methods, or components in isolation
- Mock external dependencies
- Fast execution
- Example: Testing a single service method

### Integration Tests

- Test how multiple components work together
- May use real dependencies (database, external services)
- Medium execution time
- Example: Testing a controller with its service layer

### E2E Tests

- Test complete user workflows
- Test the application as a whole
- Slower execution
- Example: Testing the complete checkout flow from product selection to payment

## Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run e2e tests only
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

## Writing Tests

### Unit Test Example

```javascript
import { ProductService } from "../../src/services/product.service.js";

describe("ProductService", () => {
  it("should fetch products successfully", async () => {
    // Test implementation
  });
});
```

### Integration Test Example

```javascript
import request from "supertest";
import app from "../../src/app.js";

describe("Product API", () => {
  it("should return products list", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
  });
});
```

## Best Practices

1. **Keep tests isolated** - Each test should be independent
2. **Use descriptive test names** - Make it clear what is being tested
3. **Follow AAA pattern** - Arrange, Act, Assert
4. **Mock external dependencies** - For unit tests
5. **Clean up after tests** - Reset state, close connections
6. **Test edge cases** - Not just happy paths
