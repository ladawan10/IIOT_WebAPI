import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const dataoperationslip = createSlice({
    name: "dataoperationslip",
    initialState,
    reducers: {
        updatedataoperationslip: (state, action) => [...action.payload],
    },
});
export const { updatedataoperationslip } = dataoperationslip.actions;
export default dataoperationslip.reducer;
