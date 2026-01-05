import StreamSDK from "@streamsdk/typescript";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

let streamClient = null;

export const initializeStreamSDK = () => {
  try {
    if (!process.env.STREAM_API_KEY) {
      throw new Error("STREAM_API_KEY is not defined in environment variables");
    }

    streamClient = StreamSDK.init(process.env.STREAM_API_KEY, {
      baseUrl: process.env.APP_URL,
    });

    logger.info("Stream SDK initialized successfully");
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
