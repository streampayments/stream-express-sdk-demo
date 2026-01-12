import { Router } from "express";
import couponController from "../controllers/coupon.controller.js";

const router = Router();

router.get("/", couponController.listCoupons.bind(couponController));
router.get("/:id", couponController.getCoupon.bind(couponController));
router.post("/create", couponController.createCoupon.bind(couponController));
router.put("/:id", couponController.updateCoupon.bind(couponController));
router.delete("/:id", couponController.deleteCoupon.bind(couponController));
router.get("/validate/:code", couponController.validateCoupon.bind(couponController));

export default router;
