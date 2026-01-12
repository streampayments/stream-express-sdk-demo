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
        organization_consumer_id: data.organization_consumer_id || data.consumer_id,
        items: data.items || [],
        due_date: data.due_date,
      };

      if (data.description) {
        invoiceData.description = data.description;
      }

      if (data.metadata) {
        invoiceData.metadata = data.metadata;
      }

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
