import { getStreamClient } from "../config/stream.js";
import { mapPaymentLinkCreateInput } from "../utils/streamMappers.js";
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
      const paymentLinkData = mapPaymentLinkCreateInput(data);

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
