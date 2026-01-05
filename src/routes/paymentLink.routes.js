import { Router } from "express";
import paymentLinkController from "../controllers/paymentLink.controller.js";

const router = Router();

router.get("/", paymentLinkController.listPaymentLinks.bind(paymentLinkController));
router.post("/create", paymentLinkController.createPaymentLink.bind(paymentLinkController));

export default router;
