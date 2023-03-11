import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const datacheckcount = createSlice({
    name: "datacheckcount",
    initialState,
    reducers: {
        updatedatacheckcount: (state, action) => [...action.payload],
    },
});
export const { updatedatacheckcount } = datacheckcount.actions;
export default datacheckcount.reducer;
