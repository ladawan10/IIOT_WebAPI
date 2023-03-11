import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const dataStatusMCLineC1 = createSlice({
    name: "dataStatusMCLineC1",
    initialState,
    reducers: {
        updateDataStatusMCLineC1: (state, action) => [...action.payload],
    },
});
export const { updateDataStatusMCLineC1 } = dataStatusMCLineC1.actions;
export default dataStatusMCLineC1.reducer;
