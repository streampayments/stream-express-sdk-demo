# Testing with Different Environments

This guide explains how to test the boilerplate with different Stream environments without modifying the codebase.

## Quick Start

### Option 1: Using `.env.development` file (Recommended)

1. **Edit `.env.development`** with your dev/staging credentials:
   ```bash
   # Stream SDK Configuration - DEVELOPMENT ENVIRONMENT
   STREAM_API_KEY=your_dev_api_key_here
   STREAM_ENV=development
   APP_URL=http://localhost:3000
   ```

2. **Run with development environment**:
   ```bash
   npm run dev:staging
   ```

3. **Run with auto-restart**:
   ```bash
   npm run dev:staging:watch
   ```

---

### Option 2: Using environment variables directly

Run the server with inline environment variables:

```bash
# Linux/macOS
STREAM_API_KEY=your_dev_key STREAM_ENV=development npm start

# Windows (PowerShell)
$env:STREAM_API_KEY="your_dev_key"; $env:STREAM_ENV="development"; npm start

# Windows (CMD)
set STREAM_API_KEY=your_dev_key && set STREAM_ENV=development && npm start
```

---

### Option 3: Create multiple environment files

Create separate files for each environment:

#### `.env.development` (Dev/Staging)
```env
STREAM_API_KEY=your_dev_key_here
STREAM_BASE_URL=https://dev.streampay.sa/api/v2
STREAM_ENV=development
APP_URL=http://localhost:3000
ALLOWED_ORIGINS=*
LOG_LEVEL=DEBUG
```

#### `.env.production` (Production)
```env
STREAM_API_KEY=your_prod_key_here
STREAM_BASE_URL=https://app.streampay.sa/api/v2
STREAM_ENV=production
APP_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com
LOG_LEVEL=INFO
```

Then run with specific environment:

```bash
# Development
npm run dev:staging

# Production (create script in package.json)
node -r dotenv/config src/server.js dotenv_config_path=.env.production
```

---

## Available Scripts

| Script | Description | Environment |
|--------|-------------|-------------|
| `npm start` | Production start | Uses `.env` |
| `npm run dev` | Development with auto-restart | Uses `.env` |
| `npm run dev:staging` | Run with dev environment | Uses `.env.development` |
| `npm run dev:staging:watch` | Dev env with auto-restart | Uses `.env.development` |

---

## Testing Different Stream Environments

### Stream Staging Environment

1. Get your staging API key from Stream dashboard
2. Update `.env.development`:
   ```env
   STREAM_API_KEY=your_staging_key
   STREAM_BASE_URL=https://dev.streampay.sa/api/v2
   STREAM_ENV=staging
   ```
3. Run: `npm run dev:staging`

### Stream Production Environment

1. Get your production API key from Stream dashboard
2. Keep it in `.env` (or create `.env.production`)
3. Run: `npm start`

---

## Environment Variables Reference

### Required Variables
- `STREAM_API_KEY` - Your Stream API key (get from dashboard)

### Optional Variables
- `STREAM_BASE_URL` - Stream API base URL (default: SDK default)
  - Development: `https://dev.streampay.sa/api/v2`
  - Production: `https://app.streampay.sa/api/v2`
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
- `LOG_LEVEL` - Logging level (DEBUG/INFO/WARN/ERROR)
- `APP_URL` - Base URL of your application (for callbacks)
- `STREAM_ENV` - Stream environment (development/staging/production)
- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)
- `SUCCESS_REDIRECT_URL` - Redirect URL after successful payment
- `RETURN_URL` - Redirect URL when payment is cancelled

---

## Testing Checklist

### Before Testing
- [ ] API key is valid for the environment
- [ ] `.env.development` is configured correctly
- [ ] Dependencies are installed (`npm install`)

### Testing Steps
1. **Start the server**:
   ```bash
   npm run dev:staging
   ```

2. **Verify server is running**:
   - Visit http://localhost:3000
   - Check health: http://localhost:3000/health

3. **Test API endpoints**:
   ```bash
   # List products
   curl http://localhost:3000/api/products

   # Create a product
   curl -X POST http://localhost:3000/api/products/create \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test Product",
       "price": 99.99,
       "currency": "SAR"
     }'
   ```

4. **Test checkout flow**:
   - Visit http://localhost:3000/shop
   - Click "Buy Now" on a product
   - Verify redirect to Stream payment page

---

## Troubleshooting

### "STREAM_API_KEY is not defined"
- Check that your `.env.development` file exists
- Verify the API key is set in the file
- Make sure you're using the correct npm script

### "Invalid STREAM_API_KEY"
- Verify the API key is for the correct environment
- Check for extra spaces or quotes in the .env file
- Ensure the API key is at least 10 characters

### "Port already in use"
- Change the PORT in `.env.development`:
  ```env
  PORT=3001
  ```
- Or kill the process using the port:
  ```bash
  # macOS/Linux
  lsof -ti:3000 | xargs kill -9

  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

---

## Security Notes

1. **Never commit environment files** - They're already in `.gitignore`
2. **Use different API keys** for dev/staging/production
3. **Rotate API keys** regularly
4. **Keep `.env.example` updated** but without real credentials

---

## Quick Reference

```bash
# Test with staging environment
npm run dev:staging

# Test with staging + auto-restart
npm run dev:staging:watch

# Test with production environment
npm start

# Run tests
npm test

# Check health
curl http://localhost:3000/health
```
