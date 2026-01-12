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

  async createCoupon(req, res, next) {
    try {
      const coupon = await couponService.createCoupon(req.body);
      res.status(201).json(coupon);
    } catch (error) {
      next(error);
    }
  }
}

export default new CouponController();
