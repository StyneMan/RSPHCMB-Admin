import { createSlice } from "@reduxjs/toolkit";

export const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    departmentsData: null,
  },
  reducers: {
    setDepartmentsData: (state, action) => {
      state.departmentsData = action.payload;
    },
  },
});

export const { setDepartmentsData } = departmentSlice.actions;

export default departmentSlice.reducer;
