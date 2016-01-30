import jsDom from "jsdom";
import player from "play-sound";

export default function cexCheck() {
  if (!process.argv[2]) {
    console.log("Usage: npm start <PRODUCT SKU>");
    process.exit(0);
  }

  const sku = process.argv[2];

  const onSuccess = (err, window) => {
    if (err) return onFailure();

    const productName = window.document.title.substr(0, window.document.title.indexOf(" -"));
    const stockStatus = window.document.getElementsByClassName("buyNowButton")[0].textContent.trim().toLowerCase();

    if (stockStatus.indexOf("out of stock") === -1) {
      console.log(`[${new Date().toLocaleString()}] ${productName} is in stock!\n`);
      player().play("./assets/success.mp3");
    } else {
      console.log(`[${new Date().toLocaleString()}] ${productName} is out of stock\n`);
    }
  };

  const onFailure = () => {
    console.error(`[${new Date().toLocaleString()}] Failed to fetch webpage!\n`);
  };

  const check = () => {
    attempts++;
    console.log(`[${new Date().toLocaleString()}] Fetching product page...`);

    jsDom.env(
      `https://uk.webuy.com/product.php?sku=${sku}`,
      [],
      onSuccess
    );
  };

  let attempts = 0;

  check();
  setInterval(check, 30000);
}
