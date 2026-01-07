import { Router } from "express";
import viewController from "../controllers/view.controller.js";

const router = Router();

router.get("/", viewController.renderHome.bind(viewController));
router.get("/examples", viewController.renderExamples.bind(viewController));
router.get("/shop", viewController.renderShop.bind(viewController));
router.get("/success", viewController.renderSuccess.bind(viewController));
router.get("/cancel", viewController.renderCancel.bind(viewController));
router.get("/payment-success", viewController.renderPaymentSuccess.bind(viewController));
router.get("/payment/success", viewController.renderPaymentSuccess.bind(viewController));
router.get("/payment-failed", viewController.renderPaymentFailed.bind(viewController));
router.get("/payment/cancelled", viewController.renderPaymentFailed.bind(viewController));

export default router;
