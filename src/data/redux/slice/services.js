import { createSlice } from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
  name: "service",
  initialState: {
    serviceData: null,
    featuredServiceData: null,
  },
  reducers: {
    setFeaturedService: (state, action) => {
      state.featuredServiceData = action.payload;
    },
    setSevicesData: (state, action) => {
      state.serviceData = action.payload;
    },
  },
});

export const { setFeaturedService, setSevicesData } = serviceSlice.actions;

export default serviceSlice.reducer;
