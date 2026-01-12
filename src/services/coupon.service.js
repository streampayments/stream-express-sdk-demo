import { getStreamClient } from "../config/stream.js";
import logger from "../utils/logger.js";

export class CouponService {
  async listCoupons(page = 1, size = 10) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching coupons list", { page, size });
      const coupons = await client.listCoupons({ page, size });
      logger.info("Coupons fetched successfully", { count: coupons?.data?.length || 0 });
      return coupons;
    } catch (error) {
      logger.error("Error fetching coupons", { error: error.message });
      throw error;
    }
  }

  async getCoupon(id) {
    try {
      const client = getStreamClient();
      logger.debug("Fetching coupon", { id });
      const coupon = await client.getCoupon(id);
      logger.info("Coupon fetched successfully", { id });
      return coupon;
    } catch (error) {
      logger.error("Error fetching coupon", { id, error: error.message });
      throw error;
    }
  }

  async createCoupon(data) {
    try {
      const client = getStreamClient();
      const couponData = {
        code: data.code,
        discount: parseFloat(data.discount),
        type: data.type,
        ...(data.expiresAt && { expiresAt: data.expiresAt }),
        ...(data.maxUses && { maxUses: parseInt(data.maxUses) }),
        ...(data.minAmount && { minAmount: parseFloat(data.minAmount) }),
        ...(data.description && { description: data.description }),
        ...(data.metadata && { metadata: data.metadata }),
      };

      logger.debug("Creating coupon", { code: couponData.code });
      const coupon = await client.createCoupon(couponData);
      logger.info("Coupon created successfully", { id: coupon?.id });
      return coupon;
    } catch (error) {
      logger.error("Error creating coupon", { error: error.message });
      throw error;
    }
  }

  async updateCoupon(id, data) {
    try {
      const client = getStreamClient();
      logger.debug("Updating coupon", { id });
      const coupon = await client.updateCoupon(id, data);
      logger.info("Coupon updated successfully", { id });
      return coupon;
    } catch (error) {
      logger.error("Error updating coupon", { id, error: error.message });
      throw error;
    }
  }

  async deleteCoupon(id) {
    try {
      const client = getStreamClient();
      logger.debug("Deleting coupon", { id });
      await client.deleteCoupon(id);
      logger.info("Coupon deleted successfully", { id });
      return { success: true, id };
    } catch (error) {
      logger.error("Error deleting coupon", { id, error: error.message });
      throw error;
    }
  }

  async validateCoupon(code) {
    try {
      const client = getStreamClient();
      logger.debug("Validating coupon", { code });
      const result = await client.validateCoupon(code);
      logger.info("Coupon validated successfully", { code });
      return result;
    } catch (error) {
      logger.error("Error validating coupon", { code, error: error.message });
      throw error;
    }
  }
}

export default new CouponService();
