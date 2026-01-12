import { Router } from "express";
import productRoutes from "./product.routes.js";
import checkoutRoutes from "./checkout.routes.js";
import consumerRoutes from "./consumer.routes.js";
import paymentLinkRoutes from "./paymentLink.routes.js";
import subscriptionRoutes from "./subscription.routes.js";
import invoiceRoutes from "./invoice.routes.js";
import couponRoutes from "./coupon.routes.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/consumers", consumerRoutes);
router.use("/payment-links", paymentLinkRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/coupons", couponRoutes);

export default router;
