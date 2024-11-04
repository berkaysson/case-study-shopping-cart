import React from "react";
import { Card, Typography, Stack, Box, Rating } from "@mui/material";
import { useCartContext } from "../../hooks/use-cart-context";
import { ProductItemImage } from "./product-item-image";

const ProductItem = ({ product }) => {
  const { addItemToCart } = useCartContext();

  const handleAddToCart = () => {
    addItemToCart(product);
  };

  return (
    <Card
      sx={{
        "&:hover .add-cart-btn": { opacity: 1 },
        width: "280px",
        height: "400px",
      }}
    >
      <ProductItemImage product={product} handleAddToCart={handleAddToCart} />

      <Stack spacing={1} sx={{ p: 1 }}>
        <Typography variant="subtitle1" noWrap>{product.name}</Typography>

        <Box
          component="span"
          sx={{
            typography: "body2",
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            name="product-rating"
            value={product.rate || 0}
            precision={0.5}
            readOnly
            sx={{ fontSize: "1.25rem" }}
          />
          <Typography component="span" variant="caption" sx={{ ml: 0.5 }}>
            ({product.popularity} reviews)
          </Typography>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={0.5} sx={{ typography: "subtitle1" }}>
            <Box component="span">${product.price}</Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProductItem;
