import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/home-page";
import { ProductProvider } from "./contexts/product-context";
import { CartProvider } from "./contexts/cart-context";
import { Stack, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductProvider>
            <Stack className="app" sx={{ height: "100vh" }}>
              {/* <Navigation /> */}
              <HomePage />
            </Stack>
          </ProductProvider>
        </CartProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
