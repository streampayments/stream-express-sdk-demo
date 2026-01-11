# Architecture

## Overview

This is a simplified Express.js demo for Stream payments integration, focusing on product browsing and checkout functionality.

## Project Structure

```
stream-express-sdk-demo/
├── public/                 # Static assets
│   ├── styles/            # CSS files
│   └── ...
├── src/
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   │   ├── checkout.controller.js
│   │   ├── product.controller.js
│   │   └── view.controller.js
│   ├── routes/            # API and view routes
│   │   ├── checkout.routes.js
│   │   ├── product.routes.js
│   │   ├── view.routes.js
│   │   └── index.js
│   ├── services/          # Business logic
│   │   └── product.service.js
│   ├── utils/             # Utility functions
│   └── views/             # HTML templates
│       └── pages/
│           ├── home.html
│           ├── shop.html
│           ├── payment-success.html
│           ├── payment-failed.html
│           └── ...
├── tests/                 # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
└── index.js              # Application entry point
```

## Core Components

### Controllers

Handle HTTP requests and responses.

- **product.controller.js** - Manages product-related requests
- **checkout.controller.js** - Handles checkout process
- **view.controller.js** - Renders HTML pages

### Services

Contains business logic and external API interactions.

- **product.service.js** - Product data retrieval from Stream API

### Routes

Define API endpoints and map them to controllers.

- **product.routes.js** - Product API endpoints
- **checkout.routes.js** - Checkout API endpoints
- **view.routes.js** - View rendering routes

## API Endpoints

### Products

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product

### Checkout

- `GET /api/checkout` - Initiate checkout and redirect to payment

## View Routes

### Pages

- `GET /` - Home page
- `GET /shop` - Products listing page
- `GET /examples` - API examples page

### Payment Status

- `GET /payment/success` - Payment success page
- `GET /payment-success` - Alternative success route
- `GET /payment/cancelled` - Payment cancelled/failed page
- `GET /payment-failed` - Alternative failed route

## Testing Architecture

### Test Structure

```
tests/
├── unit/              # Test individual components in isolation
├── integration/       # Test multiple components together
└── e2e/              # Test complete user flows
```

### Test Categories

**Unit Tests**

- Fast, isolated tests
- Mock external dependencies
- Test individual functions/methods

**Integration Tests**

- Test component interactions
- May use real dependencies
- Verify data flow between layers

**E2E Tests**

- Test complete workflows
- Simulate real user interactions
- Verify entire application behavior

## Data Flow

```
Request → Route → Controller → Service → External API
                     ↓
Response ← View/JSON ←────────┘
```

### Example: Product Listing Flow

1. User visits `/shop`
2. `view.routes.js` routes to `viewController.renderShop()`
3. Controller renders `shop.html`
4. Frontend calls `/api/products`
5. `product.routes.js` routes to `productController.getProducts()`
6. Controller calls `productService.getProducts()`
7. Service fetches from Stream API
8. Response flows back through controller as JSON
9. Frontend displays products

### Example: Checkout Flow

1. User clicks "Pay now" on product
2. Modal collects customer details
3. Frontend redirects to `/api/checkout?products=...&customerName=...`
4. `checkout.routes.js` routes to `checkoutController.checkout()`
5. Controller creates payment link with Stream API
6. User redirected to Stream payment page
7. After payment, Stream redirects back to:
   - `/payment/success` (success)
   - `/payment/cancelled` (failure)
8. Success/failure page displays transaction details

## Environment Variables

```env
STREAM_API_KEY=your_api_key
STREAM_API_SECRET=your_api_secret
BASE_URL=http://localhost:3000
SUCCESS_REDIRECT_URL=http://localhost:3000/payment/success
CANCEL_REDIRECT_URL=http://localhost:3000/payment/cancelled
```

## Best Practices

### Controllers

- Keep thin - delegate business logic to services
- Handle HTTP-specific concerns (request/response)
- Validate input parameters

### Services

- Contain business logic
- Handle external API calls
- Reusable across multiple controllers

### Routes

- Define clear, RESTful endpoints
- Group related routes together
- Use middleware for common functionality

### Error Handling

- Use try-catch in async functions
- Return appropriate HTTP status codes
- Log errors for debugging

## Security Considerations

- Store API keys in environment variables
- Validate all user inputs
- Use HTTPS in production
- Implement rate limiting for APIs
- Sanitize user data before display

## Future Enhancements

- Add database layer for data persistence
- Implement user authentication
- Add request validation middleware
- Implement comprehensive logging
- Add rate limiting
- Implement caching layer
- Add WebSocket support for real-time updates
