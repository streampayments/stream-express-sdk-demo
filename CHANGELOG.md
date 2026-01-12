# Changelog

All notable changes to the Stream Express Boilerplate project are documented in this file.

## [1.1.0] - 2024-01-11

### Added

#### Core Features
- **Complete API Coverage**: Implemented all missing services, controllers, and routes for:
  - Consumers (CRUD operations)
  - Payment Links (create, list, get, update, delete)
  - Subscriptions (create, list, get, update, cancel)
  - Invoices (create, list, get, update, delete, send)
  - Coupons (create, list, get, update, delete, validate)

#### View Files
- Created `examples.html` - Comprehensive API examples page with cURL commands
- Created `success.html` - Generic success page for operations
- Created `cancel.html` - Generic cancellation page

#### Security & Performance
- **Security Middleware**:
  - Helmet.js for security headers
  - CORS configuration with environment-based origin control
  - Rate limiting (100 requests per 15 minutes per IP)
  - Request body size limits (10MB)

- **Performance Optimizations**:
  - HTML file caching in production (development mode bypasses cache for hot-reload)
  - Improved graceful shutdown handling with timeout

#### Validation & Error Handling
- **Input Validation Middleware** using express-validator:
  - Product validation (creation)
  - Consumer validation (creation and update)
  - Payment Link validation (creation)
  - Subscription validation (creation)
  - Invoice validation (creation)
  - Coupon validation (creation)
  - ID validation for all endpoints
  - Pagination validation

#### Monitoring & Health
- Health check endpoint at `/health` returning:
  - Status
  - Timestamp
  - Uptime
  - Environment

#### Environment & Configuration
- **Environment Variable Validation**:
  - Validates required variables on startup (STREAM_API_KEY)
  - Sets defaults for optional variables
  - Validates API key format
  - Validates PORT range
  - Validates NODE_ENV values

- Updated `.env.example` with new configuration options:
  - `ALLOWED_ORIGINS` for CORS configuration

#### Testing
- **Jest Configuration**:
  - Full test setup with ES modules support
  - Coverage thresholds (70% for all metrics)
  - Test scripts for unit, integration, and e2e tests

- **Unit Tests**:
  - Complete test suite for ProductService
  - Mock setup for Stream SDK and logger
  - Tests for success and error scenarios

- **Integration Tests**:
  - Complete test suite for Product routes
  - Supertest integration for HTTP testing
  - Tests for pagination, error handling, and CRUD operations

#### Developer Experience
- **npm Scripts**:
  - `npm test` - Run all tests
  - `npm run test:unit` - Run unit tests only
  - `npm run test:integration` - Run integration tests only
  - `npm run test:e2e` - Run end-to-end tests
  - `npm run test:coverage` - Run tests with coverage report
  - `npm run test:watch` - Run tests in watch mode
  - `npm run dev` - Run development server with auto-restart

### Changed

- **Server Startup**: Enhanced with environment validation and improved error handling
- **View Controller**: Refactored to use caching for production performance
- **Graceful Shutdown**: Improved with proper server close handling and timeout
- **Route Registration**: Updated to include all new resource routes

### Fixed

- Removed debug console.log statements from checkout controller
- Fixed missing view files that caused runtime errors

### Dependencies

#### Added Dependencies
- `cors` (^2.8.5) - CORS middleware
- `express-rate-limit` (^7.1.5) - Rate limiting
- `express-validator` (^7.0.1) - Input validation
- `helmet` (^7.1.0) - Security headers

#### Added Dev Dependencies
- `@jest/globals` (^29.7.0) - Jest globals for testing
- `jest` (^29.7.0) - Testing framework
- `supertest` (^6.3.3) - HTTP integration testing

### Technical Details

#### Architecture
The implementation follows clean architecture principles:
- **Controllers**: Thin HTTP handlers that delegate to services
- **Services**: Business logic and external API integration
- **Middleware**: Request/response processing (validation, error handling, logging)
- **Routes**: RESTful API endpoint definitions

#### File Structure
```
src/
├── controllers/
│   ├── consumer.controller.js (NEW)
│   ├── paymentLink.controller.js (NEW)
│   ├── subscription.controller.js (NEW)
│   ├── invoice.controller.js (NEW)
│   └── coupon.controller.js (NEW)
├── services/
│   ├── consumer.service.js (NEW)
│   ├── paymentLink.service.js (NEW)
│   ├── subscription.service.js (NEW)
│   ├── invoice.service.js (NEW)
│   └── coupon.service.js (NEW)
├── routes/
│   ├── consumer.routes.js (NEW)
│   ├── paymentLink.routes.js (NEW)
│   ├── subscription.routes.js (NEW)
│   ├── invoice.routes.js (NEW)
│   └── coupon.routes.js (NEW)
├── middleware/
│   └── validation.js (NEW)
├── utils/
│   └── validateEnv.js (NEW)
└── views/pages/
    ├── examples.html (NEW)
    ├── success.html (NEW)
    └── cancel.html (NEW)
```

#### API Endpoints
All endpoints follow RESTful conventions:
- `GET /api/[resource]` - List resources (with pagination)
- `GET /api/[resource]/:id` - Get single resource
- `POST /api/[resource]/create` - Create resource
- `PUT /api/[resource]/:id` - Update resource
- `DELETE /api/[resource]/:id` - Delete resource

Special endpoints:
- `POST /api/subscriptions/:id/cancel` - Cancel subscription
- `POST /api/invoices/:id/send` - Send invoice
- `GET /api/coupons/validate/:code` - Validate coupon code

### Breaking Changes

None. This is a backward-compatible enhancement.

### Migration Guide

To upgrade from v1.0.0 to v1.1.0:

1. **Update dependencies**:
   ```bash
   npm install
   ```

2. **Update environment variables**:
   - Copy new variables from `.env.example` to your `.env` file
   - Add `ALLOWED_ORIGINS` if using CORS

3. **Test the application**:
   ```bash
   npm test
   npm start
   ```

4. **Review new security settings**:
   - Rate limiting is now active (100 requests per 15 minutes)
   - CORS is configured based on ALLOWED_ORIGINS
   - Helmet security headers are enabled

### Notes

- All new features are production-ready
- Test coverage for core functionality is implemented
- Security best practices are followed
- Documentation matches implementation

---

## [1.0.0] - Initial Release

- Initial boilerplate with Product API
- Basic Express.js setup
- Stream SDK integration
- Product listing and creation
- Shop UI with checkout flow
- Payment success/failure pages
