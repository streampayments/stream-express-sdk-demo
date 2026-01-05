import { Router } from "express";
import subscriptionController from "../controllers/subscription.controller.js";

const router = Router();

router.get("/", subscriptionController.listSubscriptions.bind(subscriptionController));
router.post("/create", subscriptionController.createSubscription.bind(subscriptionController));

export default router;
