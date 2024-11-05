import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  TextField,
  Button,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
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

      <Drawer anchor="bottom" open={cartOpen} onClose={toggleCartOpen}>
        <Box
          sx={{
            mx: "auto",
            width: 1,
            maxWidth: 600,
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            bgcolor: "background.paper",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 2,
              p: 1,
            }}
          >
            <Typography variant="h4">Your Cart</Typography>
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
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        sx={{
                          width: 60,
                          bgcolor: "background.paper",
                          borderRadius: 1,
                          boxShadow: 1,
                        }}
                        slotProps={{ input: { min: 1 } }}
                      />

                      {/* Remove Item Button */}
                      <IconButton
                        sx={{ ml: 1 }}
                        onClick={() => removeItemFromCart(item.id)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
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
            sx={{ mt: 1, "&:hover": { bgcolor: "primary.dark" } }}
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
