/**
 * Unit tests for ProductService
 */

import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { ProductService } from "../../../src/services/product.service.js";

// Mock the Stream client and logger
jest.unstable_mockModule("../../../src/config/stream.js", () => ({
  getStreamClient: jest.fn(),
}));

jest.unstable_mockModule("../../../src/utils/logger.js", () => ({
  default: {
    debug: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

const { getStreamClient } = await import("../../../src/config/stream.js");

describe("ProductService", () => {
  let productService;
  let mockClient;

  beforeEach(() => {
    productService = new ProductService();
    mockClient = {
      listProducts: jest.fn(),
      getProduct: jest.fn(),
      createProduct: jest.fn(),
    };
    getStreamClient.mockReturnValue(mockClient);
    jest.clearAllMocks();
  });

  describe("listProducts", () => {
    it("should fetch products successfully", async () => {
      // Arrange
      const mockProducts = {
        data: [
          { id: "1", name: "Product 1", price: 99.99 },
          { id: "2", name: "Product 2", price: 199.99 },
        ],
      };
      mockClient.listProducts.mockResolvedValue(mockProducts);

      // Act
      const result = await productService.listProducts(1, 10);

      // Assert
      expect(result).toEqual(mockProducts);
      expect(mockClient.listProducts).toHaveBeenCalledWith({ page: 1, size: 10 });
      expect(mockClient.listProducts).toHaveBeenCalledTimes(1);
    });

    it("should handle errors gracefully", async () => {
      // Arrange
      const error = new Error("API Error");
      mockClient.listProducts.mockRejectedValue(error);

      // Act & Assert
      await expect(productService.listProducts(1, 10)).rejects.toThrow("API Error");
      expect(mockClient.listProducts).toHaveBeenCalledWith({ page: 1, size: 10 });
    });

    it("should use default pagination values", async () => {
      // Arrange
      const mockProducts = { data: [] };
      mockClient.listProducts.mockResolvedValue(mockProducts);

      // Act
      await productService.listProducts();

      // Assert
      expect(mockClient.listProducts).toHaveBeenCalledWith({ page: 1, size: 10 });
    });
  });

  describe("getProduct", () => {
    it("should fetch a single product successfully", async () => {
      // Arrange
      const mockProduct = { id: "123", name: "Test Product", price: 99.99 };
      mockClient.getProduct.mockResolvedValue(mockProduct);

      // Act
      const result = await productService.getProduct("123");

      // Assert
      expect(result).toEqual(mockProduct);
      expect(mockClient.getProduct).toHaveBeenCalledWith("123");
      expect(mockClient.getProduct).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when product not found", async () => {
      // Arrange
      const error = new Error("Product not found");
      mockClient.getProduct.mockRejectedValue(error);

      // Act & Assert
      await expect(productService.getProduct("999")).rejects.toThrow("Product not found");
    });
  });

  describe("createProduct", () => {
    it("should create a product successfully", async () => {
      // Arrange
      const productData = {
        name: "New Product",
        price: 149.99,
        currency: "SAR",
        type: "ONE_OFF",
        description: "Test description",
      };
      const mockCreatedProduct = { id: "456", ...productData };
      mockClient.createProduct.mockResolvedValue(mockCreatedProduct);

      // Act
      const result = await productService.createProduct(productData);

      // Assert
      expect(result).toEqual(mockCreatedProduct);
      expect(mockClient.createProduct).toHaveBeenCalledWith({
        name: "New Product",
        price: 149.99,
        currency: "SAR",
        type: "ONE_OFF",
        description: "Test description",
      });
    });

    it("should use default values for missing fields", async () => {
      // Arrange
      const minimalData = { name: "Minimal Product" };
      const mockCreatedProduct = { id: "789", name: "Minimal Product", price: 99.99 };
      mockClient.createProduct.mockResolvedValue(mockCreatedProduct);

      // Act
      await productService.createProduct(minimalData);

      // Assert
      expect(mockClient.createProduct).toHaveBeenCalledWith({
        name: "Minimal Product",
        price: 99.99,
        currency: "SAR",
        type: "ONE_OFF",
        description: "A sample product",
      });
    });

    it("should handle creation errors", async () => {
      // Arrange
      const error = new Error("Validation failed");
      mockClient.createProduct.mockRejectedValue(error);

      // Act & Assert
      await expect(productService.createProduct({})).rejects.toThrow("Validation failed");
    });
  });
});
