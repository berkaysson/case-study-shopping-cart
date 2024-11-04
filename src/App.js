import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/home-page";
import Container from "@mui/material/Container";
import { ProductProvider } from "./contexts/product-context";
import { CartProvider } from "./contexts/cart-context";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ProductProvider>
          <Container maxWidth="lg" className="app">
            <HomePage />
          </Container>
        </ProductProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
