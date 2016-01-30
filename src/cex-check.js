import jsDom from "jsdom";

export default function cexCheck() {
  if (!process.argv[2]) {
    console.log("Usage: npm start <PRODUCT SKU>");
    process.exit(0);
  }

  const sku = process.argv[2];

  const onSuccess = (err, window) => {
    if (err) onFailure();

    const productName = window.document.title.substr(0, window.document.title.indexOf(" -"));
    const stockStatus = window.document.getElementsByClassName("buyNowButton")[0].textContent.trim().toLowerCase();

    if (stockStatus.indexOf("out of stock") === -1) {
      console.log(`${productName} is in stock!`);
    } else {
      console.log(`${productName} is out of stock`);
    }

    process.exit(0);
  };

  const onFailure = () => {
    console.error("Failed to fetch webpage");
    process.exit(1);
  };

  console.log("Fetching product page...");

  jsDom.env(
    `https://uk.webuy.com/product.php?sku=${sku}`,
    [],
    onSuccess
  );
}
