import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const dataPLine = createSlice({
    name: "dataPLine",
    initialState,
    reducers: {
        updateDataPLine: (state, action) => [...action.payload],
    },
});
export const { updateDataPLine } = dataPLine.actions;
export default dataPLine.reducer;
