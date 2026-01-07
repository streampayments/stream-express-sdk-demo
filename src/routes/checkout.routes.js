import { Router } from "express";
import { checkoutController } from "../controllers/checkout.controller.js";

const router = Router();

// GET /checkout?products=prod_123&customerPhone=%2B966501234567&customerName=Ahmad%20Ali
router.get("/", checkoutController);

export default router;
