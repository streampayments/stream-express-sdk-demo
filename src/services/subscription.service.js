import { getStreamClient } from "../config/stream.js";
import logger from "../utils/logger.js";

export class SubscriptionService {
  async listSubscriptions(page = 1, size = 10) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching subscriptions list", { page, size });
      const subscriptions = await client.listSubscriptions({ page, size });
      logger.info("Subscriptions fetched successfully", {
        count: subscriptions?.data?.length || 0,
      });
      return subscriptions;
    } catch (error) {
      logger.error("Error fetching subscriptions", { error: error.message });
      throw error;
    }
  }

  async getSubscription(id) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching subscription", { id });
      const subscription = await client.getSubscription(id);
      logger.info("Subscription fetched successfully", { id });
      return subscription;
    } catch (error) {
      logger.error("Error fetching subscription", { id, error: error.message });
      throw error;
    }
  }

  async createSubscription(data) {
    try {
      const client = getStreamClient();
      const subscriptionData = {
        consumerId: data.consumerId,
        productId: data.productId,
        frequency: data.frequency,
        ...(data.startDate && { startDate: data.startDate }),
        ...(data.endDate && { endDate: data.endDate }),
        ...(data.metadata && { metadata: data.metadata }),
      };

      logger.debug("Creating subscription", { consumerId: subscriptionData.consumerId });
      const subscription = await client.createSubscription(subscriptionData);
      logger.info("Subscription created successfully", { id: subscription?.id });
      return subscription;
    } catch (error) {
      logger.error("Error creating subscription", { error: error.message });
      throw error;
    }
  }

  async updateSubscription(id, data) {
    try {
      const client = getStreamClient();
      logger.debug("Updating subscription", { id });
      const subscription = await client.updateSubscription(id, data);
      logger.info("Subscription updated successfully", { id });
      return subscription;
    } catch (error) {
      logger.error("Error updating subscription", { id, error: error.message });
      throw error;
    }
  }

  async cancelSubscription(id) {
    try {
      const client = getStreamClient();
      logger.debug("Cancelling subscription", { id });
      const subscription = await client.cancelSubscription(id);
      logger.info("Subscription cancelled successfully", { id });
      return subscription;
    } catch (error) {
      logger.error("Error cancelling subscription", { id, error: error.message });
      throw error;
    }
  }
}

export default new SubscriptionService();
