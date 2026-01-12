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

  async createPaymentLink(data) {
    try {
      const client = getStreamClient();
      const paymentLinkData = {
        name: data.name || "Payment Link",
        items: data.items || [],
        success_redirect_url: data.success_redirect_url || process.env.SUCCESS_REDIRECT_URL,
        failure_redirect_url: data.failure_redirect_url || process.env.RETURN_URL,
      };

      if (data.organization_consumer_id) {
        paymentLinkData.organization_consumer_id = data.organization_consumer_id;
      }

      if (data.metadata) {
        paymentLinkData.metadata = data.metadata;
      }

      logger.debug("Creating payment link", { paymentLinkData });
      const paymentLink = await client.createPaymentLink(paymentLinkData);
      logger.info("Payment link created successfully", { id: paymentLink?.id });
      return paymentLink;
    } catch (error) {
      logger.error("Error creating payment link", { error: error.message });
      throw error;
    }
  }
}

export default new PaymentLinkService();
