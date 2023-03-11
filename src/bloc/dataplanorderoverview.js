import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const dataPlanOrderView = createSlice({
    name: "dataPlanOrderView",
    initialState,
    reducers: {
        updateDataPlanOrderView: (state, action) => [...action.payload],
    },
});
export const { updateDataPlanOrderView } = dataPlanOrderView.actions;
export default dataPlanOrderView.reducer;
