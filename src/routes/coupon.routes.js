import { Router } from "express";
import couponController from "../controllers/coupon.controller.js";

const router = Router();

router.get("/", couponController.listCoupons.bind(couponController));
router.post("/create", couponController.createCoupon.bind(couponController));

export default router;
