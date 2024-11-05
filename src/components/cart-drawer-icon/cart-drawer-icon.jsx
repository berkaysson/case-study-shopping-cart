import { ShoppingCart } from "@mui/icons-material";
import { Badge, Box } from "@mui/material";
import { useCartContext } from "../../hooks/use-cart-context";

export function CartDrawerIcon() {
  const { cartItemCount, toggleCartOpen } = useCartContext();

  return (
    <Box
      sx={{
        right: 0,
        top: 250,
        zIndex: 999,
        display: "flex",
        cursor: "pointer",
        position: "fixed",
        color: "text.primary",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        bgcolor: "background.paper",
        "&:hover": { boxShadow: 1 },
        boxShadow: 4,
        padding: (theme) => theme.spacing(1.5, 2),
      }}
      onClick={toggleCartOpen}
    >
      <Badge showZero badgeContent={cartItemCount} color="error" max={99}>
        <ShoppingCart sx={{ width: 24, height: 24 }} />
      </Badge>
    </Box>
  );
}
