# Troubleshooting Guide

## Common Issues and Solutions

### "Pay now" button not working

The "Pay now" button on the `/shop` page should:
1. Open a checkout modal when clicked
2. Allow you to enter customer details
3. Redirect to Stream payment page

**Possible causes and solutions:**

#### 1. No products available
**Symptom:** The shop page shows "Loading..." or "Failed to load products"

**Solution:**
- The shop page tries to fetch products from `/api/products`
- If there are no products in your Stream account, create one first:

```bash
curl -X POST http://localhost:3000/api/products/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "price": 99.99,
    "currency": "SAR",
    "type": "ONE_OFF",
    "description": "Test product for checkout"
  }'
```

#### 2. JavaScript errors in browser console
**Solution:**
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Check for any errors
4. Common errors:
   - CORS errors → Check `ALLOWED_ORIGINS` in `.env`
   - Network errors → Check `STREAM_BASE_URL` is correct
   - 401/403 errors → Check `STREAM_API_KEY` is valid

#### 3. API key or base URL not configured
**Solution:**
Check your `.env.development` file has:
```env
STREAM_API_KEY=your_key_here
STREAM_BASE_URL=https://dev.streampay.sa
```

#### 4. Modal not showing
**Symptom:** Button clicks but nothing happens

**Solution:**
- Check browser console for JavaScript errors
- Verify the modal HTML exists in the page
- Check CSS is loading properly (`/styles/shop.css`)

---

### Testing the checkout flow step-by-step

1. **Start the server:**
   ```bash
   npm run dev:staging
   ```

2. **Create a test product:**
   ```bash
   curl -X POST http://localhost:3000/api/products/create \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Premium Plan",
       "price": 199.99,
       "currency": "SAR",
       "type": "ONE_OFF"
     }'
   ```

3. **Open shop page:**
   - Go to http://localhost:3000/shop
   - You should see the product listed

4. **Click "Pay now":**
   - A modal should appear
   - Fill in the form:
     - Payment Link Name: "Test Payment"
     - Customer Name: "Ahmad Ali"
     - Phone Number: "501234567" (without +966)

5. **Submit the form:**
   - The form will redirect to `/api/checkout` with parameters
   - This creates a payment link and redirects to Stream

6. **Expected redirect:**
   - You'll be redirected to Stream's payment page
   - Complete the payment there
   - After payment, you'll be redirected back to:
     - Success: http://localhost:3000/payment/success
     - Failed: http://localhost:3000/payment/cancelled

---

## Debugging Tips

### Check if server is running
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-11T10:30:00.000Z",
  "uptime": 123.45,
  "environment": "development"
}
```

### Check if products API works
```bash
curl http://localhost:3000/api/products
```

### Check browser network tab
1. Open Developer Tools (F12)
2. Go to Network tab
3. Click "Pay now"
4. Look for failed requests (red)
5. Check the request/response details

### Check server logs
The server logs will show:
- API requests
- Errors
- Stream SDK initialization

Look for error messages in your terminal where the server is running.

---

## Route Navigation Guide

From http://localhost:3000/, you can access:

### User-facing pages:
- `/` - Home page with navigation
- `/shop` - Product listing with checkout
- `/examples` - API examples and cURL commands
- `/health` - Server health check (JSON)
- `/payment/success` - Payment success page
- `/payment/cancelled` - Payment cancelled/failed page

### API endpoints (return JSON):
- `/api/products` - List products
- `/api/products/:id` - Get single product
- `/api/products/create` - Create product (POST)
- `/api/consumers` - List consumers
- `/api/consumers/:id` - Get single consumer
- `/api/consumers/create` - Create consumer (POST)
- `/api/payment-links` - List payment links
- `/api/payment-links/create` - Create payment link (POST)
- `/api/subscriptions` - List subscriptions
- `/api/subscriptions/create` - Create subscription (POST)
- `/api/invoices` - List invoices
- `/api/invoices/create` - Create invoice (POST)
- `/api/coupons` - List coupons
- `/api/coupons/create` - Create coupon (POST)
- `/api/checkout` - Checkout endpoint (redirects to Stream)

---

## Common Error Messages

### "STREAM_API_KEY is not defined"
**Solution:** Add your API key to `.env.development`

### "Failed to initialize Stream SDK"
**Solution:** Check that `STREAM_BASE_URL` and `STREAM_API_KEY` are correct

### "CORS error" in browser
**Solution:** Add `http://localhost:3000` to `ALLOWED_ORIGINS` in `.env`

### "Too many requests"
**Solution:** Rate limit triggered (100 requests per 15 minutes). Wait or restart server.

### "404 Not Found" on API calls
**Solution:**
- Check the URL is correct
- Make sure server is running
- Check routes are registered in `src/routes/index.js`

### Products not loading in shop
**Solution:**
1. Check browser console for errors
2. Verify products exist: `curl http://localhost:3000/api/products`
3. Check CORS settings
4. Check Stream API is accessible

---

## Still having issues?

1. **Check the logs:** Look at server terminal output
2. **Check browser console:** Open Developer Tools (F12) → Console
3. **Check network tab:** Developer Tools → Network
4. **Verify environment:** Run `curl http://localhost:3000/health`
5. **Check Stream API:** Verify your API key works in Stream dashboard

If the issue persists, check:
- Stream SDK documentation: https://github.com/streampayments/streamsdk-typescript
- Stream API docs: https://docs.streampay.sa/
