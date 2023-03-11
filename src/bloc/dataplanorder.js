import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const dataPlanOrder = createSlice({
    name: "dataPlanOrder",
    initialState,
    reducers: {
        updateDataPlanOrder: (state, action) => [...action.payload],
    },
});
export const { updateDataPlanOrder } = dataPlanOrder.actions;
export default dataPlanOrder.reducer;
