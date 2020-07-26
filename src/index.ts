import { program } from 'commander';
import player from "play-sound";

import { fetchProduct } from './lib/cex-api';
import { Config, loadConfig } from './lib/config';
import { logError, log } from './lib/logger';
import { sendBackInStockEmail } from "./lib/mailer";

let attempts = 0;
let mailSent = false;

const check = (productId: string, config: Config) => async () => {
  attempts += 1;
  log(`Fetching product...`);

  let product;
  try {
    product = await fetchProduct(productId);
  } catch (error) {
    logError(`Failed to fetch product`);
    logError(error.toString());

    return;
  }

  if (product.outOfStock) {
    log(`${product.name} is out of stock\n`);
    return;
  }

  log(`${product.name} is in stock!`);
  player().play("./assets/success.mp3");

  sendBackInStockEmail(product.name, product.url, config);
  mailSent = true;

  return;
};

program.option('-c, --config-path <path>', 'Path to the JSON config file');
program.parse(process.argv);

const productId = process.argv[2];
if (productId == null) {
  log("Usage: yarn start <PRODUCT ID> -c | --config <PATH TO CONFIG FILE>");
  process.exit(0);
}

const { configPath } = program;
if (configPath == null) {
  log("Usage: yarn start <PRODUCT SKU> -c | --config <PATH TO CONFIG FILE>");
  process.exit(0);
}

const config = loadConfig(configPath);
if (config == null) {
  logError('Please provide a valid JSON config file matching the example');
  process.exit(0);
}

const checkInterval = config.checkInterval
  ? config.checkInterval * 60 * 1000
  : 1200000;

check(productId, config)();
setInterval(check(productId, config), checkInterval);
