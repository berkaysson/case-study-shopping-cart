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
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [category, setCategory] = useState(null);
  const limit = 6;

  const hasFilters = useMemo(
    () => category || priceRange[0] > 0 || priceRange[1] < Infinity,
    [category, priceRange]
  );

  const fetchProductsWithDelay = useCallback(
    async (pageParam) => {
      await delay(300);
      if (hasFilters) {
        return await getAllProducts(pageParam, limit, category, priceRange);
      }
      return await getProducts(pageParam, limit);
    },
    [hasFilters, category, priceRange]
  );

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["products", category, priceRange],
      queryFn: async ({ pageParam = 1 }) => {
        return await fetchProductsWithDelay(pageParam, limit);
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

  const products = useMemo(() => {
    const flatProducts = data?.pages.flat() || [];
    return flatProducts.filter((product) => {
      const withinPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory = category ? product.category === category : true;
      return withinPriceRange && matchesCategory;
    });
  }, [data, category, priceRange]);

  const contextValue = useMemo(
    () => ({
      products,
      isLoading,
      isError,
      fetchNextPage,
      hasNextPage,
      totalProductsValue,
      hasFilters,
    }),
    [
      products,
      isLoading,
      isError,
      fetchNextPage,
      hasNextPage,
      totalProductsValue,
      hasFilters,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
