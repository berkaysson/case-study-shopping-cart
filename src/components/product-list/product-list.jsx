import React from "react";
import ProductItem from "../product-item/product-item";

import { Grid2 } from "@mui/material";

const ProductList = ({ products }) => {
  return (
    <>
      <Grid2
        container
        spacing={2}
        className="product-grid"
        sx={{
          p: 2,
          width: "100%",
          mx: "auto",
          mt: 12,
          bgcolor: "background.darkPaper",
          borderRadius: 1.5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <ProductItem product={product} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default ProductList;
