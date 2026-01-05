import express from "express";
import { initializeStreamSDK } from "./config/stream.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import apiRoutes from "./routes/index.js";
import viewRoutes from "./routes/view.routes.js";
import logger from "./utils/logger.js";

export const createApp = () => {
  const app = express();

  // Initialize Stream SDK
  try {
    initializeStreamSDK();
  } catch (error) {
    logger.error("Failed to initialize application", { error: error.message });
    process.exit(1);
  }

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(requestLogger);

  // Routes
  app.use("/", viewRoutes);
  app.use("/api", apiRoutes);

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
};
