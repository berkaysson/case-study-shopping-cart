import React, { useState } from "react";
import { TextField, Stack, IconButton } from "@mui/material";
import { useProductContext } from "../../hooks/use-product-context";
import { Close, Search } from "@mui/icons-material";

const ProductSearch = () => {
  const { setSearchTerm } = useProductContext();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const handleDeleteSearch = () => {
    setInputValue("");
    setSearchTerm("");
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 3 }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <TextField
        variant="outlined"
        placeholder="Search for products by name..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDownCapture={(e) => e.key === "Enter" && handleSearch()}
        fullWidth
        sx={{
          maxWidth: 600,
          boxShadow: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                onClick={handleDeleteSearch}
                color="secondary"
                sx={{
                  width: 32,
                  height: 32,
                  visibility: inputValue ? "visible" : "hidden",
                }}
              >
                <Close sx={{ width: 18, height: 18 }} />
              </IconButton>
            ),
          },
        }}
      />
      <IconButton
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          bgcolor: "background.paper",
          width: 54,
          height: 54,
          boxShadow: 1,
        }}
      >
        <Search sx={{ width: 32, height: 32 }} />
      </IconButton>
    </Stack>
  );
};

export default ProductSearch;
