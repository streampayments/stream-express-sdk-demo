import { getStreamClient } from "../config/stream.js";
import logger from "../utils/logger.js";

export class InvoiceService {
  async listInvoices(page = 1, size = 10) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching invoices list", { page, size });
      const invoices = await client.listInvoices({ page, size });
      logger.info("Invoices fetched successfully", { count: invoices?.data?.length || 0 });
      return invoices;
    } catch (error) {
      logger.error("Error fetching invoices", { error: error.message });
      throw error;
    }
  }

  async getInvoice(id) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching invoice", { id });
      const invoice = await client.getInvoice(id);
      logger.info("Invoice fetched successfully", { id });
      return invoice;
    } catch (error) {
      logger.error("Error fetching invoice", { id, error: error.message });
      throw error;
    }
  }

  async createInvoice(data) {
    try {
      const client = getStreamClient();
      const invoiceData = {
        consumerId: data.consumerId,
        items: data.items,
        ...(data.dueDate && { dueDate: data.dueDate }),
        ...(data.description && { description: data.description }),
        ...(data.currency && { currency: data.currency }),
        ...(data.metadata && { metadata: data.metadata }),
      };

      logger.debug("Creating invoice", { consumerId: invoiceData.consumerId });
      const invoice = await client.createInvoice(invoiceData);
      logger.info("Invoice created successfully", { id: invoice?.id });
      return invoice;
    } catch (error) {
      logger.error("Error creating invoice", { error: error.message });
      throw error;
    }
  }

  async updateInvoice(id, data) {
    try {
      const client = getStreamClient();
      logger.debug("Updating invoice", { id });
      const invoice = await client.updateInvoice(id, data);
      logger.info("Invoice updated successfully", { id });
      return invoice;
    } catch (error) {
      logger.error("Error updating invoice", { id, error: error.message });
      throw error;
    }
  }

  async deleteInvoice(id) {
    try {
      const client = getStreamClient();
      logger.debug("Deleting invoice", { id });
      await client.deleteInvoice(id);
      logger.info("Invoice deleted successfully", { id });
      return { success: true, id };
    } catch (error) {
      logger.error("Error deleting invoice", { id, error: error.message });
      throw error;
    }
  }

  async sendInvoice(id) {
    try {
      const client = getStreamClient();
      logger.debug("Sending invoice", { id });
      const invoice = await client.sendInvoice(id);
      logger.info("Invoice sent successfully", { id });
      return invoice;
    } catch (error) {
      logger.error("Error sending invoice", { id, error: error.message });
      throw error;
    }
  }
}

export default new InvoiceService();
