import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useCartContext } from "../../hooks/use-cart-context";
import { CartDrawerIcon } from "../cart-drawer-icon/cart-drawer-icon";

const CartDrawer = () => {
  const {
    cartItems,
    toggleCartOpen,
    cartOpen,
    removeItemFromCart,
    updateItemQuantity,
    totalCartValue,
  } = useCartContext();

  const handleQuantityChange = (productId, quantity) => {
    const parsedQuantity = Math.max(1, parseInt(quantity) || 1);
    updateItemQuantity(productId, parsedQuantity);
  };

  const handleRemoveAll = () => {
    cartItems.forEach((item) => removeItemFromCart(item.id));
  };

  return (
    <>
      <CartDrawerIcon />

      <Drawer anchor="right" open={cartOpen} onClose={toggleCartOpen}>
        <Box
          sx={{
            width: 350,
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Your Cart</Typography>
            <IconButton onClick={toggleCartOpen}>
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Cart Items */}
          <Box sx={{ flexGrow: 1 }}>
            <List>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{
                      py: 1,
                      px: 0,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ flex: 1, overflow: "hidden" }}>
                      <Typography noWrap>{item.name}</Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                        }}
                      >
                        ${item.price}
                      </Typography>
                    </Box>

                    {/* Quantity Input */}
                    <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        sx={{ width: 60 }}
                        inputProps={{ min: 1 }}
                      />

                      {/* Remove Item Button */}
                      <IconButton onClick={() => removeItemFromCart(item.id)}>
                        <Close />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Your cart is empty.
                </Typography>
              )}
            </List>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Total Price */}
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Total: ${totalCartValue.toFixed(2)}
          </Typography>

          {/* Remove All Button */}
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            fullWidth
            onClick={handleRemoveAll}
            disabled={cartItems.length === 0}
          >
            Remove All
          </Button>

          {/* Checkout Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            fullWidth
            onClick={() => console.log("Proceed to checkout")}
          >
            Checkout
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default CartDrawer;
