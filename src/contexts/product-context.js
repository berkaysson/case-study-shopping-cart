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
  const [totalProductsValue, setTotalProductsValue] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [category, setCategory] = useState("all");
  const [rate, setRate] = useState(null);
  const [sortOption, setSortOption] = useState("Featured");
  const limit = 6;

  const hasFilters = useMemo(
    () =>
      category !== "all" ||
      priceRange[0] > 0 ||
      priceRange[1] < 200 ||
      rate ||
      sortOption !== "Featured",
    [category, priceRange, rate, sortOption]
  );

  const fetchProductsWithDelay = useCallback(
    async (pageParam) => {
      await delay(300);
      if (hasFilters) {
        return await getAllProducts();
      }
      return await getProducts(pageParam, limit);
    },
    [hasFilters]
  );

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["products", category, priceRange, sortOption],
      queryFn: async ({ pageParam = 1 }) => {
        return await fetchProductsWithDelay(pageParam);
      },
      getNextPageParam: (lastPage, allPages) => {
        const totalFetched = allPages.reduce(
          (acc, page) => acc + page.length,
          0
        );
        if (totalFetched < totalProductsValue) {
          return allPages.length + 1;
        }
        return false;
      },
    });

  useEffect(() => {
    const fetchTotalProducts = async () => {
      const data = await getTotalProductsValue();
      setTotalProductsValue(data);
    };

    fetchTotalProducts();
  }, []);

  const setFilters = useCallback((newFilters) => {
    if (newFilters.category !== undefined) setCategory(newFilters.category);
    if (newFilters.priceRange !== undefined)
      setPriceRange(newFilters.priceRange);
    if (newFilters.rate !== undefined) setRate(newFilters.rate);
  }, []);

  const sortedProducts = useMemo(() => {
    const flatProducts = data?.pages.flat() || [];
    const filteredProducts = flatProducts.filter((product) => {
      const withinPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory = category
        ? product.category === category || category === "all"
        : true;

        const matchesRating = rate ? product.rate >= rate : true;
      return withinPriceRange && matchesCategory && matchesRating;
    });

    return filteredProducts.sort((a, b) => {
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
  }, [data?.pages, priceRange, category, rate, sortOption]);

  const filters = useMemo(
    () => ({
      category,
      priceRange,
      rate
    }),
    [category, priceRange, rate]
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
      filters,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
