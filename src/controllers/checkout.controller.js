import { Checkout } from "@streamsdk/express";

// Debug: Log to verify API key is loaded
console.log("🔑 Checkout Controller - API Key present:", !!process.env.STREAM_API_KEY);
console.log("🔑 Checkout Controller - API Key length:", process.env.STREAM_API_KEY?.length || 0);

const DEFAULT_BASE_URL = "https://stream-app-service.streampay.sa";

export const checkoutController = Checkout({
  apiKey: process.env.STREAM_API_KEY,
  baseUrl: process.env.APP_URL || DEFAULT_BASE_URL,
  successUrl: process.env.SUCCESS_REDIRECT_URL,
  returnUrl: process.env.RETURN_URL,
  defaultName: "Stream Checkout",
});
