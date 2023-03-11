import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const dataOrder_I = createSlice({
    name: "dataOrder_I",
    initialState,
    reducers: {
        updateDataOrder_i: (state, action) => [...action.payload],
    },
});
export const { updateDataOrder_i } = dataOrder_I.actions;
export default dataOrder_I.reducer;
