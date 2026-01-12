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

  async createPaymentLink(req, res, next) {
    try {
      const paymentLink = await paymentLinkService.createPaymentLink(req.body);
      res.status(201).json(paymentLink);
    } catch (error) {
      next(error);
    }
  }
}

export default new PaymentLinkController();
