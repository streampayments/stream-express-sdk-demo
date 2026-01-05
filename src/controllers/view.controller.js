import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ViewController {
  async renderHome(req, res) {
    const html = readFileSync(join(__dirname, "../views/pages/home.html"), "utf-8");
    res.send(html);
  }

  async renderExamples(req, res) {
    const html = readFileSync(join(__dirname, "../views/pages/examples.html"), "utf-8");
    res.send(html);
  }

  async renderSuccess(req, res) {
    const html = readFileSync(join(__dirname, "../views/pages/success.html"), "utf-8");
    res.send(html);
  }

  async renderCancel(req, res) {
    const html = readFileSync(join(__dirname, "../views/pages/cancel.html"), "utf-8");
    res.send(html);
  }

  async renderShop(req, res) {
    const html = readFileSync(join(__dirname, "../views/pages/shop.html"), "utf-8");
    res.send(html);
  }

  async renderPaymentSuccess(req, res) {
    const html = readFileSync(join(__dirname, "../views/pages/payment-success.html"), "utf-8");
    res.send(html);
  }

  async renderPaymentFailed(req, res) {
    const html = readFileSync(join(__dirname, "../views/pages/payment-failed.html"), "utf-8");
    res.send(html);
  }
}

export default new ViewController();
