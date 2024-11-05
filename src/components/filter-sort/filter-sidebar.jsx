import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  Slider,
  Rating,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  FormLabel,
} from "@mui/material";
import { Close, FilterList } from "@mui/icons-material";

const categories = [
  "Electronics",
  "Fitness",
  "Fashion",
  "Home Appliances",
  "Entertainment",
  "Health",
];

const marksLabel = [
  { value: 0, label: "$0" },
  { value: 50, label: "$50" },
  { value: 100, label: "$100" },
  { value: 150, label: "$150" },
  { value: 200, label: "$200" },
];

const FilterSidebar = ({ filters, setFilters, onApplyFilters }) => {
  const [open, setOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters); // Temporary state to hold filter values

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const handleFilterCategory = (event) => {
    const newCategory =
      event.target.value === "all" ? null : event.target.value;
    setTempFilters((prev) => ({ ...prev, category: newCategory }));
  };

  const handleFilterPriceRange = (event, newValue) => {
    setTempFilters((prev) => ({ ...prev, priceRange: newValue }));
  };

  const handleFilterRating = (value) => {
    setTempFilters((prev) => ({ ...prev, rate: value }));
  };

  const handleClearAll = () => {
    const resetFilters = {
      category: "all",
      priceRange: [0, 200],
      rate: null,
    };
    setTempFilters(resetFilters);
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    // handleToggleDrawer();
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FilterList />}
        onClick={handleToggleDrawer}
      >
        Filters
      </Button>

      <Drawer anchor="right" open={open} onClose={handleToggleDrawer}>
        <Box sx={{ width: 320, padding: 4 }} role="presentation">
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Filters
            <IconButton onClick={handleToggleDrawer}>
              <Close />
            </IconButton>
          </Typography>

          <Button
            variant="outlined"
            color="error"
            onClick={handleClearAll}
            sx={{ my: 2 }}
          >
            Clear All
          </Button>

          {/* Category Filter */}
          <FormControl fullWidth sx={{ my: 3 }}>
            <FormLabel id="category-label">Category</FormLabel>
            <Select
              labelId="category-label"
              value={tempFilters.category || "all"}
              onChange={handleFilterCategory}
            >
              <MenuItem value="all">All</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Price Range Filter */}
          <Box display="flex" flexDirection="column" sx={{ my: 4 }}>
            <Typography sx={{ mb: 1, textAlign: "center" }} variant="subtitle2">
              Price
            </Typography>
            <Slider
              value={tempFilters.priceRange}
              onChange={handleFilterPriceRange}
              step={10}
              min={0}
              max={200}
              marks={marksLabel}
              getAriaValueText={(value) => `$${value}`}
              valueLabelDisplay="on"
              sx={{ my: 2 }}
            />
          </Box>

          {/* Rating Filter */}
          <Box display="flex" flexDirection="column" sx={{ my: 4 }}>
            <Typography sx={{ mb: 1, textAlign: "center" }} variant="subtitle2">
              Rating
            </Typography>
            {Array.from({ length: 5 }, (_, index) => (
              <Box
                key={index}
                onClick={() => handleFilterRating(5 - index)}
                sx={{
                  mb: 1,
                  gap: 1,
                  p: 0.5,
                  display: "flex",
                  borderRadius: 1,
                  cursor: "pointer",
                  alignItems: "center",
                  "&:hover": { opacity: 0.6 },
                  ...(tempFilters.rate === 5 - index && {
                    bgcolor: "action.selected",
                  }),
                }}
              >
                <Rating readOnly value={5 - index} />
              </Box>
            ))}
          </Box>

          {/* Apply Filters Button */}
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default FilterSidebar;
