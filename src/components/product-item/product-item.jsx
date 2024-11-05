import React from "react";
import { Card, Typography, Stack, Box, Rating } from "@mui/material";
import { useCartContext } from "../../hooks/use-cart-context";
import { ProductItemImage } from "./product-item-image";
import { useToast } from "../../hooks/use-toast";

const ProductItem = ({ product }) => {
  const { addItemToCart } = useCartContext();

  const toast = useToast();

  const handleAddToCart = () => {
    addItemToCart(product);
    toast.showToast("Added to Cart", "success", 800);
  };

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
        width: 1,
        maxWidth: 380,
        transition: "all 0.2s ease-in-out",
        mx: "auto",
      }}
    >
      <ProductItemImage product={product} handleAddToCart={handleAddToCart} />

      <Stack spacing={1} sx={{ p: 2 }}>
        <Typography variant="subtitle1" noWrap>
          {product.name}
        </Typography>

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
            name="product-rate"
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
