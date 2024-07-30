import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: "",
  filteredProducts: [],
  product: "",
  sortingOption: "",
  searchTerm: "",
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    return await axios
      .get("https://fakestoreapi.com/products")
      .then((res) => res.data);
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      const category = action.payload;
      const searchTerm = state.searchTerm.toLowerCase();
      console.log("Category:", category);
      console.log("Search Term:", searchTerm);

      state.filteredProducts = state.products.filter((product) => {
        const matchesCategory = category === "all" || product.category.toLowerCase() === category;
        const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearchTerm;
      });

      console.log("Filtered Products:", state.filteredProducts);
    },
    setSortingOption: (state, action) => {
      state.sortingOption = action.payload;
    },
    sortProducts: (state) => {
      state.filteredProducts =
        state.sortingOption === "Price (Low to High)"
          ? state.filteredProducts.sort((a, b) => a.price - b.price)
          : state.sortingOption === "Price (High to Low)"
          ? state.filteredProducts.sort((a, b) => b.price - a.price)
          : state.filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    },
    displayProduct: (state, action) => {
      state.product = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.error = "";
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});

export const {
  filterProducts,
  displayProduct,
  sortProducts,
  setSortingOption,
  setSearchTerm,
} = productsSlice.actions;
export default productsSlice.reducer;
