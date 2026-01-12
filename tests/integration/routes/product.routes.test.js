/**
 * Integration tests for Product Routes
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach, jest } from "@jest/globals";
import request from "supertest";

// Mock environment variables
process.env.STREAM_API_KEY = "test-api-key-1234567890";
process.env.NODE_ENV = "test";
process.env.PORT = "3001";

// Mock the Stream SDK before importing the app
jest.unstable_mockModule("../../../src/config/stream.js", () => ({
  getStreamClient: jest.fn(() => ({
    listProducts: jest.fn(),
    getProduct: jest.fn(),
    createProduct: jest.fn(),
  })),
  initializeStreamSDK: jest.fn(),
}));

const { createApp } = await import("../../../src/app.js");
const { getStreamClient } = await import("../../../src/config/stream.js");

describe("Product Routes Integration", () => {
  let app;
  let mockClient;

  beforeAll(async () => {
    app = createApp();
  });

  beforeEach(() => {
    mockClient = getStreamClient();
    jest.clearAllMocks();
  });

  describe("GET /api/products", () => {
    it("should return list of products", async () => {
      // Arrange
      const mockProducts = {
        data: [
          { id: "1", name: "Product 1", price: 99.99 },
          { id: "2", name: "Product 2", price: 199.99 },
        ],
        total: 2,
        page: 1,
        size: 10,
      };
      mockClient.listProducts.mockResolvedValue(mockProducts);

      // Act
      const response = await request(app).get("/api/products").expect(200);

      // Assert
      expect(response.body).toEqual(mockProducts);
      expect(mockClient.listProducts).toHaveBeenCalledWith({ page: 1, size: 10 });
    });

    it("should handle pagination correctly", async () => {
      // Arrange
      const mockProducts = {
        data: [{ id: "3", name: "Product 3", price: 299.99 }],
        total: 1,
        page: 2,
        size: 5,
      };
      mockClient.listProducts.mockResolvedValue(mockProducts);

      // Act
      const response = await request(app).get("/api/products?page=2&size=5").expect(200);

      // Assert
      expect(response.body).toEqual(mockProducts);
      expect(mockClient.listProducts).toHaveBeenCalledWith({ page: 2, size: 5 });
    });

    it("should handle API errors", async () => {
      // Arrange
      mockClient.listProducts.mockRejectedValue(new Error("API Error"));

      // Act
      const response = await request(app).get("/api/products").expect(500);

      // Assert
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET /api/products/:id", () => {
    it("should return a single product", async () => {
      // Arrange
      const mockProduct = { id: "123", name: "Test Product", price: 149.99 };
      mockClient.getProduct.mockResolvedValue(mockProduct);

      // Act
      const response = await request(app).get("/api/products/123").expect(200);

      // Assert
      expect(response.body).toEqual(mockProduct);
      expect(mockClient.getProduct).toHaveBeenCalledWith("123");
    });

    it("should handle errors when product not found", async () => {
      // Arrange
      mockClient.getProduct.mockRejectedValue(new Error("Product not found"));

      // Act
      const response = await request(app).get("/api/products/999").expect(500);

      // Assert
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("POST /api/products/create", () => {
    it("should create a new product", async () => {
      // Arrange
      const newProduct = {
        name: "New Product",
        price: 249.99,
        currency: "SAR",
        type: "ONE_OFF",
        description: "Test product",
      };
      const mockCreatedProduct = { id: "456", ...newProduct };
      mockClient.createProduct.mockResolvedValue(mockCreatedProduct);

      // Act
      const response = await request(app).post("/api/products/create").send(newProduct).expect(201);

      // Assert
      expect(response.body).toEqual(mockCreatedProduct);
      expect(mockClient.createProduct).toHaveBeenCalled();
    });

    it("should handle validation errors", async () => {
      // Arrange
      mockClient.createProduct.mockRejectedValue(new Error("Validation failed"));

      // Act
      const response = await request(app)
        .post("/api/products/create")
        .send({ name: "Invalid" })
        .expect(500);

      // Assert
      expect(response.body).toHaveProperty("error");
    });
  });
});
