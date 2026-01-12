import { getStreamClient } from "../config/stream.js";
import logger from "../utils/logger.js";

export class ConsumerService {
  async listConsumers(page = 1, size = 10) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching consumers list", { page, size });
      const consumers = await client.listConsumers({ page, size });
      logger.info("Consumers fetched successfully", { count: consumers?.data?.length || 0 });
      return consumers;
    } catch (error) {
      logger.error("Error fetching consumers", { error: error.message });
      throw error;
    }
  }

  async getConsumer(id) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching consumer", { id });
      const consumer = await client.getConsumer(id);
      logger.info("Consumer fetched successfully", { id });
      return consumer;
    } catch (error) {
      logger.error("Error fetching consumer", { id, error: error.message });
      throw error;
    }
  }

  async createConsumer(data) {
    try {
      const client = getStreamClient();
      const consumerData = {
        email: data.email,
        name: data.name,
        phone: data.phone,
        ...(data.address && { address: data.address }),
        ...(data.metadata && { metadata: data.metadata }),
      };

      logger.debug("Creating consumer", { email: consumerData.email });
      const consumer = await client.createConsumer(consumerData);
      logger.info("Consumer created successfully", { id: consumer?.id });
      return consumer;
    } catch (error) {
      logger.error("Error creating consumer", { error: error.message });
      throw error;
    }
  }

  async updateConsumer(id, data) {
    try {
      const client = getStreamClient();
      logger.debug("Updating consumer", { id });
      const consumer = await client.updateConsumer(id, data);
      logger.info("Consumer updated successfully", { id });
      return consumer;
    } catch (error) {
      logger.error("Error updating consumer", { id, error: error.message });
      throw error;
    }
  }

  async deleteConsumer(id) {
    try {
      const client = getStreamClient();
      logger.debug("Deleting consumer", { id });
      await client.deleteConsumer(id);
      logger.info("Consumer deleted successfully", { id });
      return { success: true, id };
    } catch (error) {
      logger.error("Error deleting consumer", { id, error: error.message });
      throw error;
    }
  }
}

export default new ConsumerService();
