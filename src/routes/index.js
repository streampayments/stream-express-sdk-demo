import { Router } from "express";
import productRoutes from "./product.routes.js";
import checkoutRoutes from "./checkout.routes.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/checkout", checkoutRoutes);

export default router;
