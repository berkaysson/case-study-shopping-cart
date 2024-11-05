import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#83EA00", // Bright green
    },
    secondary: {
      main: "#FF6F61", // A secondary color
    },
    background: {
      default: "#F5F5F5", // Default background color
      paper: "#FFFFFF", // Paper background color
      darkPaper: "#E0E0E0", // Dark paper background color
    },
    text: {
      primary: "#212121", // Primary text color
      secondary: "#757575", // Secondary text color
    },
    error: {
      main: "#F44336", // Error color
    },
    warning: {
      main: "#FF9800", // Warning color
    },
    info: {
      main: "#2196F3", // Info color
    },
    success: {
      main: "#4CAF50", // Success color
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 16,
    fontWeightRegular: 500,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  },
  spacing: (factor) => `${0.6 * factor}rem`,
  shape: {
    borderRadius: 8,
  },
  // Shadows for all MUI shadow values
  shadows: [
    "none",
    "rgba(99, 99, 99, 0.2) 0px 1px 4px 0px",
    "rgba(99, 99, 99, 0.2) 0px 2px 6px 0px",
    "rgba(99, 99, 99, 0.2) 0px 3px 8px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
    "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
  ],
});

export default theme;
