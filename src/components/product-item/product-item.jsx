import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const ProductItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`${quantity} of ${product.product} added to cart!`);
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
        <TextField
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, e.target.value))}
          sx={{ width: "60px", marginTop: 2, marginRight: 2 }}
          slotProps={{ input: { min: 1 } }}
        />
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
