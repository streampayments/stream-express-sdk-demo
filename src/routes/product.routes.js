import { Router } from "express";
import productController from "../controllers/product.controller.js";

const router = Router();

router.get("/", productController.listProducts.bind(productController));
router.get("/:id", productController.getProduct.bind(productController));
router.post("/create", productController.createProduct.bind(productController));

export default router;
