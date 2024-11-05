import React, { useState } from "react";
import { Box, Tooltip, IconButton, Menu, MenuItem } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { useProductContext } from "../../hooks/use-product-context";
import FilterSidebar from "./filter-sidebar";

const FilterSortBar = () => {
  const { setSortOption, setFilters, filters } = useProductContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const sortOptions = [
    "Featured",
    "Price",
    "Category",
    "Name",
    "Rate",
    "Popularity",
  ];

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option) => {
    setAnchorEl(null);
    if (option) {
      setSortOption(option);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: 2,
        zIndex: 1000,
        backgroundColor: "white",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Tooltip title="Sort">
        <IconButton onClick={handleSortClick} aria-label="sort">
          <SortIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleSortClose()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option} onClick={() => handleSortClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>

      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
      />
    </Box>
  );
};

export default FilterSortBar;
