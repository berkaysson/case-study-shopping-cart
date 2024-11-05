import React, { useState } from "react";
import { Box, Button, Drawer, Typography, IconButton } from "@mui/material";
import { Close, FilterList } from "@mui/icons-material";

import FilterSidebarSelection from "./filter-sidebar-selection";

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
    handleToggleDrawer();
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

          <FilterSidebarSelection
            tempFilters={tempFilters}
            handleFilterCategory={handleFilterCategory}
            handleFilterPriceRange={handleFilterPriceRange}
            handleFilterRating={handleFilterRating}
          />

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
