import { Router } from "express";
import subscriptionController from "../controllers/subscription.controller.js";

const router = Router();

router.get("/", subscriptionController.listSubscriptions.bind(subscriptionController));
router.get("/:id", subscriptionController.getSubscription.bind(subscriptionController));
router.post("/create", subscriptionController.createSubscription.bind(subscriptionController));
router.put("/:id", subscriptionController.updateSubscription.bind(subscriptionController));
router.post("/:id/cancel", subscriptionController.cancelSubscription.bind(subscriptionController));

export default router;
