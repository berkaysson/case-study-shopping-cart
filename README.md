# Project Documentation

## Overview

This project is a React-based application that provides features for managing a shopping cart, filtering and sorting products, and displaying product details. The application utilizes context for state management and custom hooks for improved functionality.

## Technologies Used

This project utilizes a variety of technologies and libraries to enhance functionality and user experience:

- **React**
- **MUI (Material-UI)**
- **React Query**: For making API calls.
- **React Spring**: For animations.
- **JSON Server**: A simple way to create a REST API using a JSON file for rapid prototyping.

## Scripts

Used scripts in below ``` npm run ```

```bash
  "start": "react-scripts start",
  "test": "react-scripts test",
  "server": "json-server --watch db.json --port 4000"
```

## Getting Started

```bash
git clone <repository-url>
cd <project-directory>
npm install

npm run server
npm run start
```

## JSON Server Setup

The project includes a `db.json` file at the project level, which serves as the database for the JSON server. To run the JSON server locally, you can use the following command:

```bash
json-server --watch db.json --port 4000
```

or simply

```bash
npm run server
```

### Component Overview

- **Components**

  - `cart-drawer`: Manages the cart UI.
    - `cart-drawer-icon.jsx`: Menu button to open cart drawer.
    - `cart-drawer-list-item.jsx`: Produck item in the cart drawer.
    - `cart-drawer.jsx`: Main cart drawer component.
  - `filter-sort`: Provides filtering and sorting options for products.
    - `filter-sidebar-selection.jsx`: Category, price range and rate selection.
    - `filter-sidebar.jsx`: Sidebar component for filters.
    - `filter-sort-bar.jsx`: Sorting and filtering navbar.
  - `image`
    - `image.jsx`: Main image for lazy loading.
  - `product-item`: Displays individual product details.
    - `product-item-image.jsx`: Consumes image.jsx.
    - `product-item.jsx`: Main product item component.
    - `product-item.test.js`: Tests for the product item component.
  - `product-list`: Displays a list of products.
    - `product-list.jsx`: Main list component for products.
    - `product-search.jsx`: Search functionality for products.

- **Contexts**

  - `cart-context.js`: Context for managing cart state.
  - `product-context.js`: Context for managing product data.
  - `toast-context.js`: Context for displaying toast notifications.

- **Hooks**

  - `use-cart-context.js`: Custom hook for cart context.
  - `use-product-context.js`: Custom hook for product context.
  - `use-scroll-animation.js`: Custom hook for scroll animations.
  - `use-toast.js`: Custom hook for toast notifications.

- **Lib**

  - `utils.js`: delay function.

- **Pages**

  - `home-page.jsx`: Main homepage component.

- **Services**

  - `productService.js`: Service for managing product-related API calls.

- **Styles**

  - `styles.css`: Main stylesheet for the application.
  - `theme.js`: Theme settings for styling.

- **db.json**
  - json server endpoints and data is here, look **JSON Server Setup** for details
