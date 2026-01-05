# Quick Start Guide

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env

# 3. Edit .env with your API key
STREAM_API_KEY=your_actual_key_here

# 4. Start the server
npm run dev
```

## Project Structure Cheat Sheet

```
src/
├── server.js          → Entry point (start here)
├── app.js             → Express setup
├── config/            → Configuration files
├── controllers/       → HTTP handlers (req/res)
├── services/          → Business logic (SDK calls)
├── middleware/        → Express middleware
├── routes/            → URL definitions
├── utils/             → Helpers (logger)
└── views/             → HTML templates

public/styles/         → CSS files
```

## Adding a New Feature (4 Steps)

### 1. Create Service
**File**: `src/services/myFeature.service.js`
```javascript
import { getStreamClient } from "../config/stream.js";
import logger from "../utils/logger.js";

export class MyFeatureService {
  async doSomething(data) {
    try {
      const client = getStreamClient();
      const result = await client.myMethod(data);
      logger.info("Success");
      return result;
    } catch (error) {
      logger.error("Error", { error: error.message });
      throw error;
    }
  }
}

export default new MyFeatureService();
```

### 2. Create Controller
**File**: `src/controllers/myFeature.controller.js`
```javascript
import myFeatureService from "../services/myFeature.service.js";

export class MyFeatureController {
  async doSomething(req, res, next) {
    try {
      const result = await myFeatureService.doSomething(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new MyFeatureController();
```

### 3. Create Routes
**File**: `src/routes/myFeature.routes.js`
```javascript
import { Router } from "express";
import controller from "../controllers/myFeature.controller.js";

const router = Router();
router.post("/do-something", controller.doSomething.bind(controller));

export default router;
```

### 4. Register Routes
**File**: `src/routes/index.js`
```javascript
import myFeatureRoutes from "./myFeature.routes.js";

// Add this line:
router.use("/my-feature", myFeatureRoutes);
```

**Done!** Your endpoint is now available at `/api/my-feature/do-something`

## Common Tasks

### Using the Logger
```javascript
import logger from "../utils/logger.js";

logger.info("Info message", { userId: 123 });
logger.error("Error occurred", { error: err.message });
logger.warn("Warning");
logger.debug("Debug info");
```

### Getting Stream Client
```javascript
import { getStreamClient } from "../config/stream.js";

const client = getStreamClient();
const products = await client.listProducts();
```

### Error Handling
```javascript
// In controllers - always use next(error)
try {
  // code
} catch (error) {
  next(error);  // Error middleware handles it
}
```

### Environment Variables
```javascript
const port = process.env.PORT || 3000;
const apiKey = process.env.STREAM_API_KEY;
const logLevel = process.env.LOG_LEVEL;
```

## Testing Endpoints

### Using cURL
```bash
# GET request
curl http://localhost:3000/api/products

# POST request
curl -X POST http://localhost:3000/api/products/create \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":99.99}'
```

### Using Browser
- Home: [http://localhost:3000](http://localhost:3000)
- Examples: [http://localhost:3000/examples](http://localhost:3000/examples)
- API: [http://localhost:3000/api/products](http://localhost:3000/api/products)

## File Naming Conventions

```
Controllers:  myFeature.controller.js
Services:     myFeature.service.js
Routes:       myFeature.routes.js
Utils:        myHelper.js
Config:       myConfig.js
```

## Layer Communication

```
Routes → Controllers → Services → Stream SDK
       ← Controllers ← Services ←
```

**Rules:**
- Routes only call Controllers
- Controllers only call Services
- Services call Stream SDK
- Never skip layers

## Environment Variables

```env
# Required
STREAM_API_KEY=your_key
APP_URL=http://localhost:3000

# Optional
PORT=3000
NODE_ENV=development
LOG_LEVEL=INFO
```

## Common Patterns

### Service Pattern
```javascript
export class XService {
  async list(page = 1, size = 10) { }
  async get(id) { }
  async create(data) { }
  async update(id, data) { }
  async delete(id) { }
}
```

### Controller Pattern
```javascript
export class XController {
  async list(req, res, next) { }
  async get(req, res, next) { }
  async create(req, res, next) { }
  async update(req, res, next) { }
  async delete(req, res, next) { }
}
```

### Route Pattern
```javascript
const router = Router();
router.get("/", controller.list.bind(controller));
router.get("/:id", controller.get.bind(controller));
router.post("/create", controller.create.bind(controller));
export default router;
```

## npm Scripts

```bash
npm start       # Production mode
npm run dev     # Development mode (auto-reload)
```

## Troubleshooting

### Server won't start
```bash
# Check if port is in use
lsof -i:3000

# Use different port
PORT=3001 npm start
```

### Missing dependencies
```bash
npm install
```

### Environment errors
```bash
# Make sure .env exists
cp .env.example .env

# Add your API key
echo "STREAM_API_KEY=your_key" >> .env
```

## Documentation

- [README.md](README.md) - Full documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture details
- [MIGRATION.md](MIGRATION.md) - Migration from old version
- [STRUCTURE.md](STRUCTURE.md) - Visual structure
- [CHANGES.md](CHANGES.md) - What changed

## Quick Reference

| Layer | Purpose | Example |
|-------|---------|---------|
| Routes | URL mapping | `/api/products` → controller |
| Controllers | HTTP handling | Parse request, call service |
| Services | Business logic | Stream SDK, validation |
| Middleware | Request/Error | Logging, error handling |
| Config | Setup | SDK initialization |
| Utils | Helpers | Logger, validators |

## Tips

1. **Always use the logger** instead of console.log
2. **Let middleware handle errors** - use next(error)
3. **Keep controllers thin** - logic goes in services
4. **Services are reusable** - don't duplicate logic
5. **One file, one responsibility**
6. **Follow the existing patterns**

## Need Help?

1. Check the documentation files
2. Look at existing code (copy the pattern)
3. Review server.js.backup (original code)
4. Contact Stream support

---

**Remember**: Controllers handle HTTP, Services handle logic, Routes connect them.
