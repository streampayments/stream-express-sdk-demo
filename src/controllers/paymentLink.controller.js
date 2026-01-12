import paymentLinkService from "../services/paymentLink.service.js";

export class PaymentLinkController {
  async listPaymentLinks(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const paymentLinks = await paymentLinkService.listPaymentLinks(page, size);
      res.json(paymentLinks);
    } catch (error) {
      next(error);
    }
  }

  async getPaymentLink(req, res, next) {
    try {
      const paymentLink = await paymentLinkService.getPaymentLink(req.params.id);
      res.json(paymentLink);
    } catch (error) {
      next(error);
    }
  }

  async createPaymentLink(req, res, next) {
    try {
      const paymentLink = await paymentLinkService.createPaymentLink(req.body);
      res.status(201).json(paymentLink);
    } catch (error) {
      next(error);
    }
  }

  async updatePaymentLink(req, res, next) {
    try {
      const paymentLink = await paymentLinkService.updatePaymentLink(req.params.id, req.body);
      res.json(paymentLink);
    } catch (error) {
      next(error);
    }
  }

  async deletePaymentLink(req, res, next) {
    try {
      const result = await paymentLinkService.deletePaymentLink(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new PaymentLinkController();
