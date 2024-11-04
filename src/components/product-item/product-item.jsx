import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useCartContext } from "../../hooks/use-cart-context";

const ProductItem = ({ product }) => {
  const { addItemToCart } = useCartContext();

  const handleAddToCart = () => {
    addItemToCart(product);
  };

  return (
    <Card className="product-item" sx={{ width: 280, height: 400 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {product.category}
        </Typography>
        <Typography variant="body2">${product.price}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          sx={{ marginTop: 2 }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
