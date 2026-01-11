import { createApp } from "./app.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 3000;

const app = createApp();

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   Stream Express SDK Demo                                     ║
║   Server running on http://localhost:${PORT}                     ║
║                                                               ║
║   📚 Documentation: https://docs.streampay.sa/getting-started ║
║   🏠 Home: http://localhost:${PORT}/                             ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("SIGINT signal received: closing HTTP server");
  process.exit(0);
});
