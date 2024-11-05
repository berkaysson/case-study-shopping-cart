const BASE_URL = "http://localhost:4000";

/**
 * Fetches a paginated list of products from the server.
 *
 * @param {number} [page=1] The page number to fetch.
 * @param {number} [limit=6] The number of products to fetch per page.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of
 *     product objects, or rejects with an error if the request fails.
 */
export const getProducts = async (page = 1, limit = 6) => {
  const response = await fetch(
    `${BASE_URL}/products?_page=${page}&_per_page=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const jsonResponse = await response.json();
  return jsonResponse.data; // returns an array of product objects
};

/**
 * Fetches the total number of products from the server.
 *
 * @returns {Promise<number>} A promise that resolves to the total number of
 *     products, or rejects with an error if the request fails.
 */
export const getTotalProductsValue = async () => {
  const response = await fetch(`${BASE_URL}/totalProducts`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json(); // returns the total number of products
};

/**
 * Fetches all products from the server.
 *
 * @returns {Promise<Array<object>>} A promise that resolves to an array of
 *     product objects, or rejects with an error if the request fails.
 */
export const getAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json(); // returns an array of product objects
};
