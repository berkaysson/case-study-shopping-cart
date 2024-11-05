import React from "react";
import ProductList from "../components/product-list/product-list";
import { CircularProgress, Stack, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useProductContext } from "../hooks/use-product-context";
import CartDrawer from "../components/cart-drawer/cart-drawer";
import FilterSortBar from "../components/filter-sort/filter-sort-bar";

const HomePage = () => {
  const {
    products,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    totalProductsValue,
    hasFilters,
  } = useProductContext();

  if (isLoading)
    return (
      <Stack justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Stack>
    );
  if (isError)
    return <Typography color="error.main">Error loading products</Typography>;

  return (
    <>
      <CartDrawer />
      <FilterSortBar />
      {hasFilters && <ProductList key="filtered" products={products} />}
      {totalProductsValue > 0 && !hasFilters && (
        <InfiniteScroll
          dataLength={products.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <Stack justifyContent="center" alignItems="center" sx={{ my: 2 }}>
              <CircularProgress />
            </Stack>
          }
          endMessage={
            <Typography
              color="text.secondary"
              align="center"
              sx={{ my: 2 }}
              variant="body1"
              className="no-more-products"
            >
              No more products to display
            </Typography>
          }
        >
          <ProductList key="infinite" products={products} />
        </InfiniteScroll>
      )}
    </>
  );
};

export default HomePage;
