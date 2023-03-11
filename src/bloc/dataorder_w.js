import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const dataOrder_W = createSlice({
    name: "dataOrder_W",
    initialState,
    reducers: {
        updateDataOrder_w: (state, action) => [...action.payload],
    },
});
export const { updateDataOrder_w } = dataOrder_W.actions;
export default dataOrder_W.reducer;
