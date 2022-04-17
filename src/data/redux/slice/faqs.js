import { createSlice } from "@reduxjs/toolkit";

export const faqSlice = createSlice({
  name: "faqs",
  initialState: {
    faqData: null,
  },
  reducers: {
    setFAQs: (state, action) => {
      state.faqData = action.payload;
    },
    removeFAQs: (state, action) => {
      state.faqData = action.payload;
    },
  },
});

export const { setFAQs, removeFAQs } = faqSlice.actions;

export default faqSlice.reducer;
