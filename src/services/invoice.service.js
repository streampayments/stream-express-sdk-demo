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

  async createInvoice(data) {
    try {
      const client = getStreamClient();
      const invoiceData = {
        organization_consumer_id: data.consumer_id,
        items: data.items || [{ product_id: data.product_id, quantity: 1 }],
        due_date: data.due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        notes: data.notes || "Payment due within 30 days",
      };

      logger.debug("Creating invoice", { invoiceData });
      const invoice = await client.createInvoice(invoiceData);
      logger.info("Invoice created successfully", { id: invoice?.id });
      return invoice;
    } catch (error) {
      logger.error("Error creating invoice", { error: error.message });
      throw error;
    }
  }
}

export default new InvoiceService();
