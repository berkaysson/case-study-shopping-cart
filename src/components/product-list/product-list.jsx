// src/components/product-list/product-list.jsx
import React from "react";
import ProductItem from "../product-item/product-item";

import { Grid2 } from "@mui/material";

const ProductList = ({ products }) => {
  return (
    <>
      <Grid2 container spacing={2} className="product-grid">
        {products.map((product) => (
          <Grid2 xs={12} sm={6} md={4} key={product.uuid}>
            <ProductItem product={product} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default ProductList;