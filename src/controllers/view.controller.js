import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cache for HTML files in production
const htmlCache = new Map();
const isDevelopment = process.env.NODE_ENV !== "production";

function loadHtmlFile(filename) {
  // In development, always read fresh files for hot-reload experience
  if (isDevelopment) {
    return readFileSync(join(__dirname, "../views/pages", filename), "utf-8");
  }

  // In production, use cache
  if (!htmlCache.has(filename)) {
    const html = readFileSync(join(__dirname, "../views/pages", filename), "utf-8");
    htmlCache.set(filename, html);
  }
  return htmlCache.get(filename);
}

export class ViewController {
  async renderHome(req, res) {
    const html = loadHtmlFile("home.html");
    res.send(html);
  }

  async renderExamples(req, res) {
    const html = loadHtmlFile("examples.html");
    res.send(html);
  }

  async renderSuccess(req, res) {
    const html = loadHtmlFile("success.html");
    res.send(html);
  }

  async renderCancel(req, res) {
    const html = loadHtmlFile("cancel.html");
    res.send(html);
  }

  async renderShop(req, res) {
    const html = loadHtmlFile("shop.html");
    res.send(html);
  }

  async renderPaymentSuccess(req, res) {
    const html = loadHtmlFile("payment-success.html");
    res.send(html);
  }

  async renderPaymentFailed(req, res) {
    const html = loadHtmlFile("payment-failed.html");
    res.send(html);
  }
}

export default new ViewController();
