import StreamSDK from "@streamsdk/typescript";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

const DEFAULT_BASE_URL = "https://stream-app-service.streampay.sa";

let streamClient = null;

export const initializeStreamSDK = () => {
  try {
    if (!process.env.STREAM_API_KEY) {
      throw new Error("STREAM_API_KEY is not defined in environment variables");
    }

    const baseUrl = process.env.APP_URL || DEFAULT_BASE_URL;

    streamClient = StreamSDK.init(process.env.STREAM_API_KEY, {
      baseUrl,
    });

    logger.info("Stream SDK initialized successfully", { baseUrl });
    return streamClient;
  } catch (error) {
    logger.error("Failed to initialize Stream SDK", { error: error.message });
    throw error;
  }
};

export const getStreamClient = () => {
  if (!streamClient) {
    throw new Error("Stream SDK not initialized. Call initializeStreamSDK first.");
  }
  return streamClient;
};
