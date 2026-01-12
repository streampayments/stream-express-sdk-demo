# Stream Express Boilerplate

<div align="center">
  <img src="https://app.streampay.sa/media/logos/dark-logo.svg" alt="Stream Logo" width="200"/>

  **Quick-start Express.js boilerplate for Stream Payment Integration**

  [![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
</div>

---

## 📖 Overview

This is a ready-to-use Express.js boilerplate that demonstrates how to integrate Stream Payment SDK into your application. Perfect for getting started quickly or as a reference for your own implementation.

**What's Included:**

- ✅ Complete Express.js server setup with **clean architecture**
- ✅ Stream SDK integration examples
- ✅ API endpoints for all Stream resources
- ✅ Beautiful UI examples with separated CSS
- ✅ Success/Cancel payment pages
- ✅ Comprehensive error handling with middleware
- ✅ Environment configuration
- ✅ **Controllers** for request handling
- ✅ **Services** for business logic
- ✅ **Middleware** for logging and error handling
- ✅ **Professional logger** with colored output

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Stream API Key ([Get one here](https://app.streampay.sa))

### Installation

1. **Clone or download this repository**

```bash
git clone <repository-url>
cd stream-express-boilerplate
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and add your Stream API key:

```env
STREAM_API_KEY=your_actual_api_key_here
STREAM_BASE_URL=https://app.streampay.sa/api/v2
PORT=3000
```

**For Development/Staging:** Use `https://dev.streampay.sa/api/v2`

4. **Start the server**

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
stream-express-boilerplate/
├── src/
│   ├── config/           # Configuration files
│   │   └── stream.js     # Stream SDK initialization
│   ├── controllers/      # Request handlers
│   │   ├── product.controller.js
│   │   ├── consumer.controller.js
│   │   ├── paymentLink.controller.js
│   │   ├── subscription.controller.js
│   │   ├── invoice.controller.js
│   │   ├── coupon.controller.js
│   │   └── view.controller.js
│   ├── services/         # Business logic layer
│   │   ├── product.service.js
│   │   ├── consumer.service.js
│   │   ├── paymentLink.service.js
│   │   ├── subscription.service.js
│   │   ├── invoice.service.js
│   │   └── coupon.service.js
│   ├── middleware/       # Express middleware
│   │   ├── errorHandler.js
│   │   └── requestLogger.js
│   ├── routes/           # Route definitions
│   │   ├── index.js
│   │   └── [domain].routes.js
│   ├── utils/            # Utility functions
│   │   └── logger.js     # Professional logger
│   ├── views/            # HTML templates
│   │   └── pages/
│   ├── app.js            # Express app setup
│   └── server.js         # Server entry point
├── public/               # Static files
│   └── styles/           # Separated CSS files
├── package.json
├── .env.example
├── ARCHITECTURE.md       # Architecture documentation
└── README.md

**Note:** See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture documentation.
```

---

## 🎯 Features & Examples

### Home Page
Visit `http://localhost:3000` for an interactive dashboard with links to all examples.

### API Endpoints

#### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/products/create` - Create a new product

#### Consumers
- `GET /api/consumers` - List all consumers
- `GET /api/consumers/:id` - Get single consumer
- `POST /api/consumers/create` - Create a new consumer

#### Payment Links
- `GET /api/payment-links` - List all payment links
- `POST /api/payment-links/create` - Create a payment link

#### Subscriptions
- `GET /api/subscriptions` - List all subscriptions
- `POST /api/subscriptions/create` - Create a subscription

#### Invoices
- `GET /api/invoices` - List all invoices
- `POST /api/invoices/create` - Create an invoice

#### Coupons
- `GET /api/coupons` - List all coupons
- `POST /api/coupons/create` - Create a coupon

---

## 💡 Usage Examples

### Creating a Payment Link

**Using cURL:**

```bash
curl -X POST http://localhost:3000/api/payment-links/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Payment",
    "amount": 99.99,
    "consumer": {
      "email": "customer@example.com",
      "name": "Ahmad Ali",
      "phone": "+966501234567"
    },
    "product": {
      "name": "Premium Plan",
      "price": 99.99
    }
  }'
```

**Using JavaScript (Fetch API):**

```javascript
const response = await fetch('http://localhost:3000/api/payment-links/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Test Payment',
    amount: 99.99,
    consumer: {
      email: 'customer@example.com',
      name: 'Ahmad Ali',
      phone: '+966501234567'
    },
    product: {
      name: 'Premium Plan',
      price: 99.99
    }
  })
});

const data = await response.json();
console.log('Payment URL:', data.paymentUrl);
```

### Creating a Product

```bash
curl -X POST http://localhost:3000/api/products/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Subscription",
    "price": 199.99,
    "currency": "SAR",
    "type": "ONE_OFF",
    "description": "Monthly premium plan"
  }'
```

### Listing Consumers

```bash
curl http://localhost:3000/api/consumers?page=1&size=10
```

---

## 🔧 Customization

### Adding New API Endpoints

Follow the clean architecture pattern:

1. **Create a Service** (`src/services/myFeature.service.js`):
```javascript
import { getStreamClient } from "../config/stream.js";
import logger from "../utils/logger.js";

export class MyFeatureService {
  async getData() {
    try {
      const client = getStreamClient();
      logger.debug("Fetching data");
      const data = await client.myMethod();
      logger.info("Data fetched successfully");
      return data;
    } catch (error) {
      logger.error("Error fetching data", { error: error.message });
      throw error;
    }
  }
}

export default new MyFeatureService();
```

2. **Create a Controller** (`src/controllers/myFeature.controller.js`):
```javascript
import myFeatureService from "../services/myFeature.service.js";

export class MyFeatureController {
  async getData(req, res, next) {
    try {
      const data = await myFeatureService.getData();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new MyFeatureController();
```

3. **Create Routes** (`src/routes/myFeature.routes.js`):
```javascript
import { Router } from "express";
import myFeatureController from "../controllers/myFeature.controller.js";

const router = Router();
router.get("/", myFeatureController.getData.bind(myFeatureController));

export default router;
```

4. **Register Routes** in `src/routes/index.js`:
```javascript
import myFeatureRoutes from "./myFeature.routes.js";
router.use("/my-feature", myFeatureRoutes);
```

### Modifying the UI

UI files are organized in:
- **HTML:** `src/views/pages/`
- **CSS:** `public/styles/`

You can also:
- Use a template engine like EJS or Pug
- Serve a React/Vue frontend from the `public/` directory

### Environment Variables

Add custom environment variables in `.env`:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Logging (DEBUG, INFO, WARN, ERROR)
LOG_LEVEL=INFO

# Stream SDK
STREAM_API_KEY=your_api_key
APP_URL=http://localhost:3000

# Custom Variables
CUSTOM_VARIABLE=value
```

Access them in your code:

```javascript
const myVariable = process.env.CUSTOM_VARIABLE;
```

### Using the Logger

The built-in logger provides colored, structured logging:

```javascript
import logger from "./utils/logger.js";

logger.info("Server started", { port: 3000 });
logger.error("Database connection failed", { error: error.message });
logger.warn("Deprecated API used");
logger.debug("Processing request", { userId: 123 });
```

---

## 📚 Documentation

- **[Architecture Documentation](ARCHITECTURE.md)** - Detailed architecture guide
- **[Stream SDK Documentation](https://github.com/streampayments/streamsdk-typescript)**
- **[API Reference](https://docs.streampay.sa/)**
- **[Express.js Guide](https://expressjs.com/)**

## 🏗️ Architecture

This boilerplate follows clean architecture principles:

- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Middleware**: Request logging, error handling
- **Routes**: API endpoint definitions
- **Config**: Application configuration
- **Utils**: Reusable utilities (logger, helpers)

See [ARCHITECTURE.md](ARCHITECTURE.md) for complete details.

---

## 🐛 Troubleshooting

### Server won't start

**Error:** `Cannot find module '@streamsdk/typescript'`

**Solution:** Run `npm install` to install dependencies

---

**Error:** `STREAM_API_KEY is not defined`

**Solution:**
1. Create a `.env` file from `.env.example`
2. Add your Stream API key to the `.env` file

---

### API returns 500 error

**Check:**
1. Your API key is valid
2. You have the correct permissions
3. Check the console for detailed error messages

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🆘 Support

### Need Help?

- **📧 Email:** support@streampay.sa
- **🐛 Issues:** [GitHub Issues](https://github.com/streampayments/streamsdk-typescript/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/streampayments/streamsdk-typescript/discussions)

### Resources

- [Stream Website](https://streampay.sa)
- [API Documentation](https://docs.streampay.sa/)
- [SDK Repository](https://github.com/streampayments/streamsdk-typescript)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://streampay.sa">Stream</a></p>
  <p>Happy Coding! 🚀</p>
</div>
