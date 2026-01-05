import { getStreamClient } from "../config/stream.js";
import logger from "../utils/logger.js";

export class PaymentLinkService {
  async listPaymentLinks(page = 1, size = 10) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching payment links list", { page, size });
      const paymentLinks = await client.listPaymentLinks({ page, size });
      logger.info("Payment links fetched successfully", { count: paymentLinks?.data?.length || 0 });
      return paymentLinks;
    } catch (error) {
      logger.error("Error fetching payment links", { error: error.message });
      throw error;
    }
  }

  async createSimplePaymentLink(data) {
    try {
      const client = getStreamClient();
      const paymentLinkData = {
        name: data.name || "Test Payment",
        amount: parseFloat(data.amount) || 99.99,
        consumer: {
          email: data.consumer?.email || "customer@example.com",
          name: data.consumer?.name || "Test Customer",
          phone: data.consumer?.phone || "+966501234567",
        },
        product: {
          name: data.product?.name || "Test Product",
          price: parseFloat(data.product?.price) || 99.99,
        },
        successRedirectUrl: data.successRedirectUrl || "http://localhost:3000/success",
        failureRedirectUrl: data.failureRedirectUrl || "http://localhost:3000/cancel",
      };

      logger.debug("Creating payment link", { paymentLinkData });
      const result = await client.createSimplePaymentLink(paymentLinkData);
      logger.info("Payment link created successfully");
      return result;
    } catch (error) {
      logger.error("Error creating payment link", { error: error.message });
      throw error;
    }
  }
}

export default new PaymentLinkService();
