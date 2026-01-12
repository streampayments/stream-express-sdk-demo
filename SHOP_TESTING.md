# Shop Page & "Pay Now" Button - Testing Guide

## Issue: "Pay Now" button not working

### Quick Diagnosis

The most common reasons the "Pay now" button doesn't work:

1. **Wrong port** - Server is running on port 3011 (not 3000)
2. **JavaScript errors** - Check browser console
3. **CORS issues** - Modal might not show
4. **CSP (Content Security Policy)** - Inline scripts blocked

---

## Step-by-Step Testing

### 1. Find the Correct Port

Your server might be running on a different port if 3000 is busy:

```bash
# Check server logs - look for this line:
Server running on http://localhost:XXXX
```

In your case, it's running on: **http://localhost:3011**

### 2. Open the Correct URL

Open your browser to:
- **http://localhost:3011/shop** (NOT 3000!)

### 3. Open Browser DevTools

Press **F12** or right-click → "Inspect"

Go to:
1. **Console tab** - Check for errors
2. **Network tab** - See if `/api/products` loads
3. **Elements tab** - Verify modal HTML exists

### 4. Test the Button

1. **Wait** for products to load (you should see product cards)
2. **Click "Pay now"** on any product
3. **Expected behavior:**
   - A modal should pop up
   - It should have 3 input fields:
     - Payment Link Name
     - Customer Name
     - Customer Phone
4. **Fill the form:**
   - Payment Link Name: "Test Payment"
   - Customer Name: "Ahmad Ali"
   - Phone: "501234567"
5. **Click "Proceed to Checkout"**
6. **Expected:** Redirects to Stream payment page

---

## Common Issues & Solutions

### Issue 1: Modal doesn't appear

**Symptoms:**
- Click "Pay now"
- Nothing happens
- No errors in console

**Solution:**
Check CSP (Content Security Policy) is allowing inline scripts.

Our app has this configured in [src/app.js](stream-express-sdk-boilerplate/src/app.js):
```javascript
helmet({
  contentSecurityPolicy: {
    directives: {
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
})
```

If modal still doesn't show, check browser console for CSP errors.

---

### Issue 2: Products not loading

**Symptoms:**
- Page shows "Loading..." forever
- Or shows "Failed to load products"

**Check:**
1. Open browser console (F12)
2. Look for network errors
3. Verify API works:
   ```bash
   curl http://localhost:3011/api/products
   ```

**Solutions:**
- Check `STREAM_BASE_URL` is correct
- Check `STREAM_API_KEY` is valid
- Check CORS allows localhost:3011

---

### Issue 3: CORS error

**Symptoms:**
Browser console shows:
```
Access to fetch at 'http://localhost:3011/api/products' from origin 'http://localhost:3011' has been blocked by CORS policy
```

**Solution:**
In `.env.development`:
```env
ALLOWED_ORIGINS=*
```

This allows all origins in development.

---

### Issue 4: Wrong port

**Symptoms:**
- Accessing http://localhost:3000
- But server is on http://localhost:3011

**Solution:**
1. Check which port the server actually started on (look at terminal output)
2. Use that port in your browser
3. Or stop other services using port 3000:
   ```bash
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9

   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

---

## Manual Testing Checklist

- [ ] Server is running (check terminal)
- [ ] Note the actual port number
- [ ] Open browser to `http://localhost:[PORT]/shop`
- [ ] Open DevTools (F12)
- [ ] Check Console for errors
- [ ] Check Network tab - does `/api/products` load?
- [ ] See product cards on the page?
- [ ] Click "Pay now" button
- [ ] Does modal appear?
- [ ] Fill in the form
- [ ] Click "Proceed to Checkout"
- [ ] Redirects to Stream payment page?

---

## Debug the Button Click

If the button click doesn't work, test in browser console:

```javascript
// Test if the function exists
console.log(typeof checkoutProduct); // Should be "function"

// Test calling it manually
checkoutProduct('e75a0a2a-515f-478e-b3ef-a651b5693fe7');

// Check if modal exists
console.log(document.getElementById('checkout-modal')); // Should be an element

// Check modal display
const modal = document.getElementById('checkout-modal');
console.log(modal.style.display); // Should be "flex" when open
```

---

## Expected Flow

1. **User visits:** `http://localhost:3011/shop`
2. **JavaScript runs:** `loadProducts()` fetches `/api/products`
3. **Products render:** HTML is dynamically created with "Pay now" buttons
4. **User clicks "Pay now":** `checkoutProduct(productId)` is called
5. **Modal opens:** CSS changes to `display: flex`
6. **User fills form** with payment link name, customer name, phone
7. **User submits:** `handleCheckoutSubmit(event)` is called
8. **Redirects to:** `/api/checkout?products=...&name=...&customerName=...&customerPhone=...`
9. **Checkout controller:** Creates payment link via Stream SDK
10. **Redirects to:** Stream payment page

---

## Test with cURL

```bash
# 1. Check server health
curl http://localhost:3011/health

# 2. Check products API
curl http://localhost:3011/api/products

# 3. Test checkout endpoint (simulating form submission)
curl "http://localhost:3011/api/checkout?products=e75a0a2a-515f-478e-b3ef-a651b5693fe7&name=Test+Payment&customerName=Ahmad+Ali&customerPhone=%2B966501234567"
```

The last command should redirect you to a Stream payment link!

---

## Still Not Working?

### Enable Debug Logging

Add this to the `<script>` section in shop.html:

```javascript
// At the top of the script section
console.log('Shop script loaded');

// In checkoutProduct function
function checkoutProduct(productId) {
  console.log('Button clicked! Product ID:', productId);
  // ... rest of code
}
```

Then check browser console when clicking the button.

---

## Contact & Support

If you've tried everything above:

1. Check the [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) guide
2. Look at browser console errors
3. Check server logs in terminal
4. Verify all environment variables are set correctly

**Remember:** The server might be running on **port 3011** (not 3000) if port 3000 is already in use!
