import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/home-page";
import Container from "@mui/material/Container";
import { ProductProvider } from "./contexts/product-context";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <Container maxWidth="lg" className="app">
          <HomePage />
        </Container>
      </ProductProvider>
    </QueryClientProvider>
  );
}

export default App;
