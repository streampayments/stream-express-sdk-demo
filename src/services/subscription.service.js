import { getStreamClient } from "../config/stream.js";
import logger from "../utils/logger.js";

export class SubscriptionService {
  async listSubscriptions(page = 1, size = 10) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching subscriptions list", { page, size });
      const subscriptions = await client.listSubscriptions({ page, size });
      logger.info("Subscriptions fetched successfully", { count: subscriptions?.data?.length || 0 });
      return subscriptions;
    } catch (error) {
      logger.error("Error fetching subscriptions", { error: error.message });
      throw error;
    }
  }

  async createSubscription(data) {
    try {
      const client = getStreamClient();
      const subscriptionData = {
        product_id: data.product_id,
        organization_consumer_id: data.organization_consumer_id || data.consumer_id,
        start_date: data.start_date,
      };

      if (data.end_date) {
        subscriptionData.end_date = data.end_date;
      }

      if (data.metadata) {
        subscriptionData.metadata = data.metadata;
      }

      logger.debug("Creating subscription", { subscriptionData });
      const subscription = await client.createSubscription(subscriptionData);
      logger.info("Subscription created successfully", { id: subscription?.id });
      return subscription;
    } catch (error) {
      logger.error("Error creating subscription", { error: error.message });
      throw error;
    }
  }
}

export default new SubscriptionService();
