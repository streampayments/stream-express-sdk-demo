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
        name: data.name || "Ahmad Ali",
        email: data.email || "ahmad.ali@example.com",
        phone_number: data.phone_number || "+966501234567",
        preferred_language: data.preferred_language || "en",
      };

      logger.debug("Creating consumer", { consumerData });
      const consumer = await client.createConsumer(consumerData);
      logger.info("Consumer created successfully", { id: consumer?.id });
      return consumer;
    } catch (error) {
      logger.error("Error creating consumer", { error: error.message });
      throw error;
    }
  }
}

export default new ConsumerService();
