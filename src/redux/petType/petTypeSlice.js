import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentType: "dogs",
};

const petTypeSlice = createSlice({
  name: "petType",
  initialState,
  reducers: {
    setPetType: (state, action) => {
      state.currentType = action.payload;
    },
    togglePetType: (state) => {
      state.currentType = state.currentType === "dogs" ? "cats" : "dogs";
    },
  },
});

export const { setPetType, togglePetType } = petTypeSlice.actions;
export const selectPetType = (state) => state.petType.currentType;
export default petTypeSlice.reducer;
