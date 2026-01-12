import invoiceService from "../services/invoice.service.js";

export class InvoiceController {
  async listInvoices(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const invoices = await invoiceService.listInvoices(page, size);
      res.json(invoices);
    } catch (error) {
      next(error);
    }
  }

  async getInvoice(req, res, next) {
    try {
      const invoice = await invoiceService.getInvoice(req.params.id);
      res.json(invoice);
    } catch (error) {
      next(error);
    }
  }

  async createInvoice(req, res, next) {
    try {
      const invoice = await invoiceService.createInvoice(req.body);
      res.status(201).json(invoice);
    } catch (error) {
      next(error);
    }
  }

  async updateInvoice(req, res, next) {
    try {
      const invoice = await invoiceService.updateInvoice(req.params.id, req.body);
      res.json(invoice);
    } catch (error) {
      next(error);
    }
  }

  async deleteInvoice(req, res, next) {
    try {
      const result = await invoiceService.deleteInvoice(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async sendInvoice(req, res, next) {
    try {
      const invoice = await invoiceService.sendInvoice(req.params.id);
      res.json(invoice);
    } catch (error) {
      next(error);
    }
  }
}

export default new InvoiceController();
