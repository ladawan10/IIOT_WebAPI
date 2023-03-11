import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const dataOrder_log = createSlice({
    name: "dataOrder_log",
    initialState,
    reducers: {
        updateDataOrder_log: (state, action) => [...action.payload],
    },
});
export const { updateDataOrder_log } = dataOrder_log.actions;
export default dataOrder_log.reducer;
