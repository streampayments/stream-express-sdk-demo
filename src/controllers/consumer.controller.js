import consumerService from "../services/consumer.service.js";

export class ConsumerController {
  async listConsumers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const consumers = await consumerService.listConsumers(page, size);
      res.json(consumers);
    } catch (error) {
      next(error);
    }
  }

  async getConsumer(req, res, next) {
    try {
      const consumer = await consumerService.getConsumer(req.params.id);
      res.json(consumer);
    } catch (error) {
      next(error);
    }
  }

  async createConsumer(req, res, next) {
    try {
      const consumer = await consumerService.createConsumer(req.body);
      res.status(201).json(consumer);
    } catch (error) {
      next(error);
    }
  }
}

export default new ConsumerController();
