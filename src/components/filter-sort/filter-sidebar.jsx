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
  Divider,
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

const FilterSidebar = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

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
        variant="contained"
        startIcon={<FilterList />}
        onClick={handleToggleDrawer}
      >
        Filters
      </Button>

      <Drawer anchor="right" open={open} onClose={handleToggleDrawer}>
        <Box
          sx={{
            minWidth: 320,
            p: 2,
            bgcolor: (theme) => theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowX: "hidden",
          }}
          role="presentation"
        >
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: (theme) => theme.palette.text.primary,
              width: "100%",
            }}
          >
            Filters
            <IconButton onClick={handleToggleDrawer}>
              <Close />
            </IconButton>
          </Typography>

          <FormControl fullWidth>
            <Typography
              sx={{
                my: 1,
                textAlign: "center",
                color: (theme) => theme.palette.text.secondary,
              }}
              variant="subtitle2"
            >
              Category
            </Typography>
            <Select
              labelId="category-label"
              value={tempFilters.category || "all"}
              onChange={handleFilterCategory}
              size="small"
            >
              <MenuItem key="all" value="all">
                All
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider sx={{ my: 2 }} />

          {/* Price Range Filter */}
          <Box display="flex" flexDirection="column" sx={{ px: 2 }}>
            <Typography
              sx={{
                mb: 1,
                textAlign: "center",
                color: (theme) => theme.palette.text.secondary,
              }}
              variant="subtitle2"
            >
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
              valueLabelDisplay="auto"
              sx={{ color: (theme) => theme.palette.primary.main }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Rating Filter */}
          <Box display="flex" flexDirection="column" sx={{ mb: 2 }}>
            <Typography
              sx={{
                mb: 1,
                textAlign: "center",
                color: (theme) => theme.palette.text.secondary,
              }}
              variant="subtitle2"
            >
              Rating
            </Typography>
            {Array.from({ length: 5 }, (_, index) => (
              <Box
                key={index}
                onClick={() => handleFilterRating(5 - index)}
                sx={{
                  mb: 0.5,
                  p: 0.5,
                  display: "flex",
                  borderRadius: 1,
                  cursor: "pointer",
                  justifyContent: "center",
                  "&:hover": { bgcolor: (theme) => theme.palette.action.hover },
                  ...(tempFilters.rate === 5 - index && {
                    bgcolor: "action.selected",
                  }),
                }}
              >
                <Rating readOnly value={5 - index} />
              </Box>
            ))}
          </Box>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearAll}
            sx={{ my: 2, mb: 8 }}
          >
            Clear All
          </Button>

          {/* Apply Filters Button */}
          <Button
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            variant="contained"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default FilterSidebar;
