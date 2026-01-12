import { getStreamClient } from "../config/stream.js";
import logger from "../utils/logger.js";

export class PaymentLinkService {
  async listPaymentLinks(page = 1, size = 10) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching payment links list", { page, size });
      const paymentLinks = await client.listPaymentLinks({ page, size });
      logger.info("Payment links fetched successfully", {
        count: paymentLinks?.data?.length || 0,
      });
      return paymentLinks;
    } catch (error) {
      logger.error("Error fetching payment links", { error: error.message });
      throw error;
    }
  }

  async getPaymentLink(id) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching payment link", { id });
      const paymentLink = await client.getPaymentLink(id);
      logger.info("Payment link fetched successfully", { id });
      return paymentLink;
    } catch (error) {
      logger.error("Error fetching payment link", { id, error: error.message });
      throw error;
    }
  }

  async createPaymentLink(data) {
    try {
      const client = getStreamClient();
      const paymentLinkData = {
        name: data.name,
        amount: parseFloat(data.amount),
        currency: data.currency || "SAR",
        ...(data.description && { description: data.description }),
        ...(data.successUrl && { successUrl: data.successUrl }),
        ...(data.cancelUrl && { cancelUrl: data.cancelUrl }),
        ...(data.consumerId && { consumerId: data.consumerId }),
        ...(data.productId && { productId: data.productId }),
        ...(data.expiresAt && { expiresAt: data.expiresAt }),
        ...(data.metadata && { metadata: data.metadata }),
      };

      logger.debug("Creating payment link", { name: paymentLinkData.name });
      const paymentLink = await client.createPaymentLink(paymentLinkData);
      logger.info("Payment link created successfully", { id: paymentLink?.id });
      return paymentLink;
    } catch (error) {
      logger.error("Error creating payment link", { error: error.message });
      throw error;
    }
  }

  async updatePaymentLink(id, data) {
    try {
      const client = getStreamClient();
      logger.debug("Updating payment link", { id });
      const paymentLink = await client.updatePaymentLink(id, data);
      logger.info("Payment link updated successfully", { id });
      return paymentLink;
    } catch (error) {
      logger.error("Error updating payment link", { id, error: error.message });
      throw error;
    }
  }

  async deletePaymentLink(id) {
    try {
      const client = getStreamClient();
      logger.debug("Deleting payment link", { id });
      await client.deletePaymentLink(id);
      logger.info("Payment link deleted successfully", { id });
      return { success: true, id };
    } catch (error) {
      logger.error("Error deleting payment link", { id, error: error.message });
      throw error;
    }
  }
}

export default new PaymentLinkService();
