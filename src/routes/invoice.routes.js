import { Router } from "express";
import invoiceController from "../controllers/invoice.controller.js";

const router = Router();

router.get("/", invoiceController.listInvoices.bind(invoiceController));
router.get("/:id", invoiceController.getInvoice.bind(invoiceController));
router.post("/create", invoiceController.createInvoice.bind(invoiceController));
router.put("/:id", invoiceController.updateInvoice.bind(invoiceController));
router.delete("/:id", invoiceController.deleteInvoice.bind(invoiceController));
router.post("/:id/send", invoiceController.sendInvoice.bind(invoiceController));

export default router;
