import { body, param, query, validationResult } from "express-validator";

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
        value: err.value,
      })),
    });
  }
  next();
};

// Product validation rules
export const validateProductCreation = [
  body("name").trim().notEmpty().withMessage("Product name is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("currency").optional().isString().isLength({ min: 3, max: 3 }).withMessage("Currency must be a 3-letter code"),
  body("type").optional().isIn(["ONE_OFF", "RECURRING"]).withMessage("Type must be ONE_OFF or RECURRING"),
  body("description").optional().isString().withMessage("Description must be a string"),
  handleValidationErrors,
];

// Consumer validation rules
export const validateConsumerCreation = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("name").trim().notEmpty().withMessage("Consumer name is required"),
  body("phone").optional().isMobilePhone().withMessage("Valid phone number required"),
  body("address").optional().isObject().withMessage("Address must be an object"),
  body("metadata").optional().isObject().withMessage("Metadata must be an object"),
  handleValidationErrors,
];

export const validateConsumerUpdate = [
  param("id").notEmpty().withMessage("Consumer ID is required"),
  body("email").optional().isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("name").optional().trim().notEmpty().withMessage("Consumer name cannot be empty"),
  body("phone").optional().isMobilePhone().withMessage("Valid phone number required"),
  body("address").optional().isObject().withMessage("Address must be an object"),
  body("metadata").optional().isObject().withMessage("Metadata must be an object"),
  handleValidationErrors,
];

// Payment Link validation rules
export const validatePaymentLinkCreation = [
  body("name").trim().notEmpty().withMessage("Payment link name is required"),
  body("amount").isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
  body("currency").optional().isString().isLength({ min: 3, max: 3 }).withMessage("Currency must be a 3-letter code"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("successUrl").optional().isURL().withMessage("Success URL must be valid"),
  body("cancelUrl").optional().isURL().withMessage("Cancel URL must be valid"),
  body("consumerId").optional().isString().withMessage("Consumer ID must be a string"),
  body("productId").optional().isString().withMessage("Product ID must be a string"),
  body("expiresAt").optional().isISO8601().withMessage("Expires at must be a valid date"),
  body("metadata").optional().isObject().withMessage("Metadata must be an object"),
  handleValidationErrors,
];

// Subscription validation rules
export const validateSubscriptionCreation = [
  body("consumerId").notEmpty().withMessage("Consumer ID is required"),
  body("productId").notEmpty().withMessage("Product ID is required"),
  body("frequency").isIn(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]).withMessage("Frequency must be DAILY, WEEKLY, MONTHLY, or YEARLY"),
  body("startDate").optional().isISO8601().withMessage("Start date must be a valid date"),
  body("endDate").optional().isISO8601().withMessage("End date must be a valid date"),
  body("metadata").optional().isObject().withMessage("Metadata must be an object"),
  handleValidationErrors,
];

// Invoice validation rules
export const validateInvoiceCreation = [
  body("consumerId").notEmpty().withMessage("Consumer ID is required"),
  body("items").isArray({ min: 1 }).withMessage("Items must be a non-empty array"),
  body("items.*.productId").notEmpty().withMessage("Product ID is required for each item"),
  body("items.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  body("dueDate").optional().isISO8601().withMessage("Due date must be a valid date"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("currency").optional().isString().isLength({ min: 3, max: 3 }).withMessage("Currency must be a 3-letter code"),
  body("metadata").optional().isObject().withMessage("Metadata must be an object"),
  handleValidationErrors,
];

// Coupon validation rules
export const validateCouponCreation = [
  body("code").trim().notEmpty().withMessage("Coupon code is required"),
  body("discount").isFloat({ min: 0 }).withMessage("Discount must be a positive number"),
  body("type").isIn(["PERCENTAGE", "FIXED"]).withMessage("Type must be PERCENTAGE or FIXED"),
  body("expiresAt").optional().isISO8601().withMessage("Expires at must be a valid date"),
  body("maxUses").optional().isInt({ min: 1 }).withMessage("Max uses must be at least 1"),
  body("minAmount").optional().isFloat({ min: 0 }).withMessage("Min amount must be a positive number"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("metadata").optional().isObject().withMessage("Metadata must be an object"),
  handleValidationErrors,
];

// Common ID validation
export const validateId = [
  param("id").notEmpty().withMessage("ID is required"),
  handleValidationErrors,
];

// Pagination validation
export const validatePagination = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be at least 1"),
  query("size").optional().isInt({ min: 1, max: 100 }).withMessage("Size must be between 1 and 100"),
  handleValidationErrors,
];
