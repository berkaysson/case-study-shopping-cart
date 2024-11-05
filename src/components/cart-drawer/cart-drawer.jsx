import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useCartContext } from "../../hooks/use-cart-context";
import { useToast } from "../../hooks/use-toast";
import { CartDrawerIcon } from "./cart-drawer-icon";
import CartDrawerListItem from "./cart-drawer-list-item";

const CartDrawer = () => {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const {
    cartItems,
    toggleCartOpen,
    cartOpen,
    removeItemFromCart,
    updateItemQuantity,
    totalCartValue,
  } = useCartContext();

  const toast = useToast();

  // Function to handle quantity change
  const handleQuantityChange = (productId, quantity) => {
    const parsedQuantity = Math.max(1, parseInt(quantity) || 1);
    updateItemQuantity(productId, parsedQuantity);
  };

  // Function to remove all items from the cart
  const handleRemoveAll = () => {
    cartItems.forEach((item) => removeItemFromCart(item.id));
  };

  // Function to handle checkout
  const handleCheckout = async () => {
    toast.showLoadingToast("Processing your checkout...", "checkoutLoading");
    setIsCheckoutLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200)); // simulate network request
    setIsCheckoutLoading(false);
    toast.dismissToast("checkoutLoading");
    toast.showToast("Checkout Successful, Thanks!", "success");
    handleRemoveAll();
    toggleCartOpen();
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
                  <CartDrawerListItem
                    key={item.id}
                    item={item}
                    handleQuantityChange={handleQuantityChange}
                    removeItemFromCart={removeItemFromCart}
                    isCheckoutLoading={isCheckoutLoading}
                  />
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
            disabled={cartItems.length === 0 || isCheckoutLoading}
          >
            Remove All
          </Button>

          {/* Checkout Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1, "&:hover": { bgcolor: "primary.dark" } }}
            fullWidth
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || isCheckoutLoading}
          >
            Checkout
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default CartDrawer;
