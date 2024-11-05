import { AddShoppingCart } from "@mui/icons-material";
import { Box, Fab, Tooltip } from "@mui/material";
import React from "react";
import Image from "../image/image";

export const ProductItemImage = ({ product, handleAddToCart }) => {
  return (
    <Box sx={{ position: "relative", p: 1 }}>
      <Fab
        color="primary"
        size="medium"
        className="add-cart-btn"
        onClick={handleAddToCart}
        sx={{
          right: 16,
          bottom: 24,
          zIndex: 9,
          opacity: 0.8,
          position: "absolute",
        }}
      >
        <AddShoppingCart sx={{ width: 24, height: 24 }} />
      </Fab>

      <Tooltip placement="bottom-end">
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
      </Tooltip>
    </Box>
  );
};
