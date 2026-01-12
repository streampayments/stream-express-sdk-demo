import logger from "./logger.js";

const requiredEnvVars = [
  "STREAM_API_KEY",
];

const optionalEnvVars = {
  PORT: "3000",
  NODE_ENV: "development",
  LOG_LEVEL: "INFO",
  APP_URL: "http://localhost:3000",
};

export function validateEnvironment() {
  const missing = [];
  const warnings = [];

  // Check required environment variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  // Set defaults for optional environment variables
  for (const [envVar, defaultValue] of Object.entries(optionalEnvVars)) {
    if (!process.env[envVar]) {
      process.env[envVar] = defaultValue;
      warnings.push(`${envVar} not set, using default: ${defaultValue}`);
    }
  }

  // Log warnings
  if (warnings.length > 0) {
    warnings.forEach((warning) => logger.warn(warning));
  }

  // Throw error if required variables are missing
  if (missing.length > 0) {
    const errorMessage = `Missing required environment variables: ${missing.join(", ")}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  // Validate STREAM_API_KEY format
  if (process.env.STREAM_API_KEY && process.env.STREAM_API_KEY.length < 10) {
    logger.error("STREAM_API_KEY appears to be invalid (too short)");
    throw new Error("Invalid STREAM_API_KEY");
  }

  // Validate PORT
  const port = parseInt(process.env.PORT);
  if (isNaN(port) || port < 1 || port > 65535) {
    logger.error(`Invalid PORT value: ${process.env.PORT}. Must be between 1 and 65535`);
    throw new Error("Invalid PORT");
  }

  // Validate NODE_ENV
  const validEnvironments = ["development", "production", "test"];
  if (!validEnvironments.includes(process.env.NODE_ENV)) {
    logger.warn(`Invalid NODE_ENV: ${process.env.NODE_ENV}. Valid values: ${validEnvironments.join(", ")}`);
  }

  logger.info("Environment variables validated successfully");
  return true;
}
