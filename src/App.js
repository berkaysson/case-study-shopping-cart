import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/home-page";
import { ProductProvider } from "./contexts/product-context";
import { CartProvider } from "./contexts/cart-context";
import { Stack, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import { ToastProvider } from "./contexts/toast-context";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <CartProvider>
            <ProductProvider>
              <Stack className="app" sx={{ height: "100vh" }}>
                {/* <Navigation /> */}
                <HomePage />
              </Stack>
            </ProductProvider>
          </CartProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
