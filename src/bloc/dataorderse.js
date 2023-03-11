import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const dataOrderse = createSlice({
    name: "dataOrderse",
    initialState,
    reducers: {
        updateDataOrderse: (state, action) => [...action.payload],
    },
});
export const { updateDataOrderse } = dataOrderse.actions;
export default dataOrderse.reducer;
