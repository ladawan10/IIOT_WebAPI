import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const datauser = createSlice({
    name: "datauser",
    initialState,
    reducers: {
        updateDatauser: (state, action) => [...action.payload],
    },
});
export const { updateDatauser } = datauser.actions;
export default datauser.reducer;
