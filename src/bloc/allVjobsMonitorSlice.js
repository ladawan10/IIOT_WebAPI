import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allVJobsMonitorSlice = createSlice({
  name: "allVJobsMonitorSliceAction",
  initialState,
  reducers: {
    updateAllVJobsMonitor: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { updateAllVJobsMonitor } = allVJobsMonitorSlice.actions;
export default allVJobsMonitorSlice.reducer;
