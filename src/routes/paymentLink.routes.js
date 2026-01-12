import { Router } from "express";
import paymentLinkController from "../controllers/paymentLink.controller.js";

const router = Router();

router.get("/", paymentLinkController.listPaymentLinks.bind(paymentLinkController));
router.get("/:id", paymentLinkController.getPaymentLink.bind(paymentLinkController));
router.post("/create", paymentLinkController.createPaymentLink.bind(paymentLinkController));
router.put("/:id", paymentLinkController.updatePaymentLink.bind(paymentLinkController));
router.delete("/:id", paymentLinkController.deletePaymentLink.bind(paymentLinkController));

export default router;
