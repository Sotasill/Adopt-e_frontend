import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productType: "products", // "products", "services" или "veterinary"
};

const productTypeSlice = createSlice({
  name: "productType",
  initialState,
  reducers: {
    setProductType: (state, action) => {
      state.productType = action.payload;
    },
  },
});

export const { setProductType } = productTypeSlice.actions;
export const selectProductType = (state) =>
  state.productType?.productType || "products";

export default productTypeSlice.reducer;
