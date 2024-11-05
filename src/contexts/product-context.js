import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useInfiniteQuery } from "react-query";
import {
  getAllProducts,
  getProducts,
  getTotalProductsValue,
} from "../services/productService";
import { delay } from "../lib/utils";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // State for filtering and sorting products
  const [totalProductsValue, setTotalProductsValue] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [category, setCategory] = useState("all");
  const [rate, setRate] = useState(null);
  const [sortOption, setSortOption] = useState("Featured");
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 6; // Number of products to fetch per page

  // Memoized value for checking if there are any filters active
  const hasFilters = useMemo(
    () =>
      category !== "all" ||
      priceRange[0] > 0 ||
      priceRange[1] < 200 ||
      rate ||
      sortOption !== "Featured" ||
      searchTerm.length > 0,
    [category, priceRange, rate, sortOption, searchTerm]
  );

  // Memoized function for fetching products with a delay
  const fetchProductsWithDelay = useCallback(
    async (pageParam) => {
      await delay(300); // the goal is to simulate network latency
      if (hasFilters) {
        return await getAllProducts();
      }
      return await getProducts(pageParam, limit);
    },
    [hasFilters]
  );

  // React Query hook for fetching products
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["products", category, priceRange, sortOption],
      queryFn: async ({ pageParam = 1 }) => {
        return await fetchProductsWithDelay(pageParam);
      },
      getNextPageParam: (lastPage, allPages) => {
        // Get the next page number
        const totalFetched = allPages.reduce(
          (acc, page) => acc + page.length,
          0
        );
        if (totalFetched < totalProductsValue) {
          // Check if there are more pages
          return allPages.length + 1;
        }
        return false; // No more pages
      },
    });

  // Effect for fetching total products value, 27 for now
  useEffect(() => {
    const fetchTotalProducts = async () => {
      const data = await getTotalProductsValue();
      setTotalProductsValue(data);
    };

    fetchTotalProducts();
  }, []);

  // Memoized function for updating filters
  const setFilters = useCallback((newFilters) => {
    if (newFilters.category !== undefined) setCategory(newFilters.category);
    if (newFilters.priceRange !== undefined)
      setPriceRange(newFilters.priceRange);
    if (newFilters.rate !== undefined) setRate(newFilters.rate);
  }, []);

  // Memoized value for sorted products
  const sortedProducts = useMemo(() => {
    const flatProducts = data?.pages.flat() || []; // Flatten the pages
    const filteredProducts = flatProducts.filter((product) => {
      // Filter the products
      const withinPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory = category
        ? product.category === category || category === "all"
        : true;

      const matchesRating = rate ? product.rate >= rate : true;
      const matchesSearchTerm = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return (
        withinPriceRange &&
        matchesCategory &&
        matchesRating &&
        matchesSearchTerm
      );
    });

    return filteredProducts.sort((a, b) => {
      // Sort the products
      switch (sortOption) {
        case "Price":
          return a.price - b.price;
        case "Category":
          return a.category.localeCompare(b.category);
        case "Name":
          return a.name.localeCompare(b.name);
        case "Rate":
          return b.rate - a.rate;
        case "Popularity":
          return b.popularity - a.popularity;
        default:
          return 0; // For "Featured"
      }
    });
  }, [data?.pages, priceRange, category, rate, sortOption, searchTerm]);

  // Memoized value for filters object
  const filters = useMemo(
    () => ({
      category,
      priceRange,
      rate,
      searchTerm,
    }),
    [category, priceRange, rate, searchTerm]
  );

  const contextValue = useMemo(
    () => ({
      products: sortedProducts,
      isLoading,
      isError,
      fetchNextPage,
      hasNextPage,
      totalProductsValue,
      hasFilters,
      setSortOption,
      setFilters,
      setSearchTerm,
      filters,
    }),
    [
      sortedProducts,
      isLoading,
      isError,
      fetchNextPage,
      hasNextPage,
      totalProductsValue,
      hasFilters,
      setSortOption,
      setFilters,
      setSearchTerm,
      filters,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
