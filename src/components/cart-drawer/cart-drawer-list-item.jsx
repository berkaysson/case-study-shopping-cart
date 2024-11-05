import React from "react";
import {
  Box,
  Typography,
  IconButton,
  ListItem,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const CartDrawerListItem = ({
  item,
  handleQuantityChange,
  removeItemFromCart,
  isCheckoutLoading,
}) => {
  return (
    <ListItem
      key={item.id}
      sx={{
        py: 1,
        px: 0.25,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderRadius: 1,
        boxShadow: 1,
        bgcolor: "background.default",
        mb: 1,
      }}
    >
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <Typography noWrap>{item.name}</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: "normal",
            wordWrap: "break-word",
          }}
        >
          ${item.price.toFixed(2)}
        </Typography>
      </Box>

      {/* Quantity Input */}
      <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
        <TextField
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
          sx={{
            width: 60,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 1,
          }}
          inputProps={{ min: 1 }}
        />

        {/* Remove Item Button */}
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => removeItemFromCart(item.id)}
          disabled={isCheckoutLoading}
        >
          <Delete color="error" />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default CartDrawerListItem;
