import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const dataMachine = createSlice({
    name: "datamachine",
    initialState,
    reducers: {
        updateDataMachine: (state, action) => [...action.payload],
    },
});
export const { updateDataMachine } = dataMachine.actions;
export default dataMachine.reducer;
