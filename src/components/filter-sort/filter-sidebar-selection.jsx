import React from "react";
import {
  Box,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Slider,
  Rating,
} from "@mui/material";

// currently all categories, if backend exist then replace with backend data
const categories = [
  "Electronics",
  "Fitness",
  "Fashion",
  "Home Appliances",
  "Entertainment",
  "Health",
];

// currently all price ranges, if backend exist then replace with backend data
const marksLabel = [
  { value: 0, label: "$0" },
  { value: 50, label: "$50" },
  { value: 100, label: "$100" },
  { value: 150, label: "$150" },
  { value: 200, label: "$200" },
];

const FilterSidebarSelection = ({
  tempFilters,
  handleFilterCategory,
  handleFilterPriceRange,
  handleFilterRating,
}) => {
  return (
    <Box>
      {/* Category Filter */}
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
    </Box>
  );
};

export default FilterSidebarSelection;
