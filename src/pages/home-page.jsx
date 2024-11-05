import React from "react";
import ProductList from "../components/product-list/product-list";
import { CircularProgress, Stack, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useProductContext } from "../hooks/use-product-context";
import CartDrawer from "../components/cart-drawer/cart-drawer";
import FilterSortBar from "../components/filter-sort/filter-sort-bar";

const HomePage = () => {
  // Get the state and functions from the product context
  const {
    products,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    totalProductsValue,
    hasFilters,
  } = useProductContext();

  // If the products are loading
  if (isLoading)
    return (
      <Stack justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Stack>
    );
  // If there was an error
  if (isError)
    return <Typography color="error.main">Error loading products</Typography>;

  // Otherwise, display the products
  return (
    <>
      {/* Display the cart drawer */}
      <CartDrawer />

      {/* Display the filter and sotr bar */}
      <FilterSortBar />

      {/* If there are filters, display the filtered products and sorted */}
      {hasFilters && <ProductList key="filtered" products={products} />}

      {/* If there are no filters, display the infinite scroll of products */}
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
          {/* Display the infinite scroll of products */}
          <ProductList key="infinite" products={products} />
        </InfiniteScroll>
      )}
    </>
  );
};

export default HomePage;
