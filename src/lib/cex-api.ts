import fetch from 'node-fetch';

const buildApiUrl = (productId: string) => `https://wss2.cex.uk.webuy.io/v3/boxes/${productId}/detail`;
const buildProductPageUrl = (productId: string) => `https://uk.webuy.com/product-detail?id=${productId}`;

interface Box {
  boxName: string;
  outOfStock: number;
}

interface APIResponse {
  response: {
    data: {
      boxDetails: Box[]
      masterBoxDetails?: Box;
    }
  }
}

interface Product {
  name: string;
  outOfStock: boolean;
  url: string;
}

export const fetchProduct = async (productId: string): Promise<Product> => {
  const apiUrl = buildApiUrl(productId);

  const result = await fetch(apiUrl);
  const resultJson: APIResponse = await result.json();

  const box = resultJson.response.data.boxDetails[0];

  return {
    outOfStock: box.outOfStock !== 0,
    name: box.boxName,
    url: buildProductPageUrl(productId)
  };
};
