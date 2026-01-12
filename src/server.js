import { createApp } from "./app.js";
import logger from "./utils/logger.js";
import { validateEnvironment } from "./utils/validateEnv.js";

// Validate environment variables before starting the server
try {
  validateEnvironment();
} catch (error) {
  logger.error("Environment validation failed", { error: error.message });
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

const app = createApp();

const server = app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   Stream Express Boilerplate                                  ║
║   Server running on http://localhost:${PORT}                     ║
║                                                               ║
║   📚 Documentation: https://docs.streampay.sa/getting-started ║
║   🏠 Home: http://localhost:${PORT}/                             ║
║   ❤️  Health: http://localhost:${PORT}/health                    ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  logger.info(`${signal} signal received: closing HTTP server`);
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
