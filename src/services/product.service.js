import { getStreamClient } from "../config/stream.js";
import logger from "../utils/logger.js";

export class ProductService {
  async listProducts(page = 1, size = 10) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching products list", { page, size });
      const products = await client.listProducts({ page, size });
      logger.info("Products fetched successfully", { count: products?.data?.length || 0 });
      return products;
    } catch (error) {
      logger.error("Error fetching products", { error: error.message });
      throw error;
    }
  }

  async getProduct(id) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching product", { id });
      const product = await client.getProduct(id);
      logger.info("Product fetched successfully", { id });
      return product;
    } catch (error) {
      logger.error("Error fetching product", { id, error: error.message });
      throw error;
    }
  }

  async createProduct(data) {
    try {
      const client = getStreamClient();
      const productData = {
        name: data.name || "Sample Product",
        price: parseFloat(data.price) || 99.99,
        currency: data.currency || "SAR",
        type: data.type || "ONE_OFF",
        description: data.description || "A sample product",
      };

      logger.debug("Creating product", { productData });
      const product = await client.createProduct(productData);
      logger.info("Product created successfully", { id: product?.id });
      return product;
    } catch (error) {
      logger.error("Error creating product", { error: error.message });
      throw error;
    }
  }
}

export default new ProductService();
