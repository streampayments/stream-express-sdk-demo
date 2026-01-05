import { Router } from "express";
import consumerController from "../controllers/consumer.controller.js";

const router = Router();

router.get("/", consumerController.listConsumers.bind(consumerController));
router.get("/:id", consumerController.getConsumer.bind(consumerController));
router.post("/create", consumerController.createConsumer.bind(consumerController));

export default router;
