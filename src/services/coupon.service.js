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

  async createCoupon(data) {
    try {
      const client = getStreamClient();
      const couponData = {
        code: data.code || `DISCOUNT${Date.now()}`,
        discount_type: data.discount_type || "PERCENTAGE",
        discount_value: parseFloat(data.discount_value) || 10,
        valid_from: data.valid_from || new Date().toISOString().split("T")[0],
        valid_to: data.valid_to || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      };

      logger.debug("Creating coupon", { couponData });
      const coupon = await client.createCoupon(couponData);
      logger.info("Coupon created successfully", { id: coupon?.id });
      return coupon;
    } catch (error) {
      logger.error("Error creating coupon", { error: error.message });
      throw error;
    }
  }
}

export default new CouponService();
