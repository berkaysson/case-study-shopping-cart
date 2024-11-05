import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/home-page";
import { ProductProvider } from "./contexts/product-context";
import { CartProvider } from "./contexts/cart-context";
import Navigation from "./components/navigation/navigation";
import { Stack } from "@mui/material";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ProductProvider>
          <Stack className="app" sx={{ height: "100vh" }}>
            <Navigation />
            <HomePage />
          </Stack>
        </ProductProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
