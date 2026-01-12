import couponService from "../services/coupon.service.js";

export class CouponController {
  async listCoupons(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const coupons = await couponService.listCoupons(page, size);
      res.json(coupons);
    } catch (error) {
      next(error);
    }
  }

  async getCoupon(req, res, next) {
    try {
      const coupon = await couponService.getCoupon(req.params.id);
      res.json(coupon);
    } catch (error) {
      next(error);
    }
  }

  async createCoupon(req, res, next) {
    try {
      const coupon = await couponService.createCoupon(req.body);
      res.status(201).json(coupon);
    } catch (error) {
      next(error);
    }
  }

  async updateCoupon(req, res, next) {
    try {
      const coupon = await couponService.updateCoupon(req.params.id, req.body);
      res.json(coupon);
    } catch (error) {
      next(error);
    }
  }

  async deleteCoupon(req, res, next) {
    try {
      const result = await couponService.deleteCoupon(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async validateCoupon(req, res, next) {
    try {
      const result = await couponService.validateCoupon(req.params.code);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new CouponController();
