import subscriptionService from "../services/subscription.service.js";

export class SubscriptionController {
  async listSubscriptions(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const subscriptions = await subscriptionService.listSubscriptions(page, size);
      res.json(subscriptions);
    } catch (error) {
      next(error);
    }
  }

  async getSubscription(req, res, next) {
    try {
      const subscription = await subscriptionService.getSubscription(req.params.id);
      res.json(subscription);
    } catch (error) {
      next(error);
    }
  }

  async createSubscription(req, res, next) {
    try {
      const subscription = await subscriptionService.createSubscription(req.body);
      res.status(201).json(subscription);
    } catch (error) {
      next(error);
    }
  }

  async updateSubscription(req, res, next) {
    try {
      const subscription = await subscriptionService.updateSubscription(req.params.id, req.body);
      res.json(subscription);
    } catch (error) {
      next(error);
    }
  }

  async cancelSubscription(req, res, next) {
    try {
      const subscription = await subscriptionService.cancelSubscription(req.params.id);
      res.json(subscription);
    } catch (error) {
      next(error);
    }
  }
}

export default new SubscriptionController();
