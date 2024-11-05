import { RemoveShoppingCart, ShoppingCart } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import React from "react";
import Image from "../image/image";

export const ProductItemImage = ({
  product,
  handleAddToCart,
  isInCart,
  handleRemoveFromCart,
}) => {
  return (
    <Box sx={{ position: "relative", p: 1 }}>
      <Fab
        color={isInCart ? "error" : "primary"}
        size="medium"
        className="add-cart-btn"
        onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
        sx={{
          right: 16,
          bottom: 24,
          zIndex: 9,
          opacity: 0.8,
          position: "absolute",
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        {isInCart ? (
          <>
            <RemoveShoppingCart sx={{ width: 24, height: 24 }} />
          </>
        ) : (
          <ShoppingCart sx={{ width: 24, height: 24 }} />
        )}
      </Fab>

      <Image
        alt={product.name}
        src={product.imageUrl}
        ratio="1/1"
        sx={{
          borderRadius: 1.5,
          opacity: 0.9,
          filter: "grayscale(0.5)",
        }}
      />
    </Box>
  );
};
