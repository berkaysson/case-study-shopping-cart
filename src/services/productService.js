const BASE_URL = "http://localhost:4000";

export const getProducts = async (page = 1, limit = 6) => {
  const response = await fetch(
    `${BASE_URL}/products?_page=${page}&_per_page=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const jsonResponse = await response.json();
  return jsonResponse.data;
};

export const getTotalProductsValue = async () => {
  const response = await fetch(`${BASE_URL}/totalProducts`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const getAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

// categories: Electronics, Fitness, Fashion, Home Appliances, Entertainment, Health
