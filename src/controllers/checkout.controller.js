import { Checkout } from "@streamsdk/express";

export const checkoutController = Checkout({
  apiKey: process.env.STREAM_API_KEY,
  baseUrl: process.env.STREAM_BASE_URL,
  successUrl: process.env.SUCCESS_REDIRECT_URL,
  returnUrl: process.env.RETURN_URL,
  defaultName: "Stream Checkout",
});
