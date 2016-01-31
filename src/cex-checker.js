import jsDom from "jsdom";
import player from "play-sound";
import sendBackInStockEmail from "./mailer";
import config from "../config";

let attempts = 0;
let mailSent = false;
let url = "";

const onCheckFailure = () => {
  console.error(`[${new Date().toLocaleString()}] Failed to fetch webpage!\n`);
};

const onCheckSuccess = (err, window) => {
  if (err) return onCheckFailure();

  const productName = window.document.title.substr(0, window.document.title.indexOf(" -"));
  const stockStatus = window.document.getElementsByClassName("buyNowButton")[0].textContent.trim().toLowerCase();

  if (stockStatus.indexOf("out of stock") === -1) {
    console.log(`[${new Date().toLocaleString()}] ${productName} is in stock!`);
    player().play("./assets/success.mp3");

    if (config && config.email && !mailSent) {
      sendBackInStockEmail(productName, url);
      mailSent = true;
    }
  } else {
    console.log(`[${new Date().toLocaleString()}] ${productName} is out of stock\n`);
  }
};

const checkStockStatus = () => {
  attempts++;
  console.log(`[${new Date().toLocaleString()}] Fetching product page...`);

  jsDom.env(
    url,
    [],
    onCheckSuccess
  );
};

export default function cexCheck() {
  if (!process.argv[2]) {
    console.log("Usage: npm start <PRODUCT SKU>");
    process.exit(0);
  }

  const checkInterval = (config && config.checkInterval) ? config.checkInterval * 60 * 1000 : 1200000;
  url = `https://uk.webuy.com/product.php?sku=${process.argv[2]}`;

  checkStockStatus();
  setInterval(checkStockStatus, checkInterval);
}
