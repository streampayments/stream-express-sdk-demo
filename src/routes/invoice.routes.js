import { Router } from "express";
import invoiceController from "../controllers/invoice.controller.js";

const router = Router();

router.get("/", invoiceController.listInvoices.bind(invoiceController));
router.post("/create", invoiceController.createInvoice.bind(invoiceController));

export default router;
