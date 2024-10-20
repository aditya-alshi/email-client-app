import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type filterState = {filter: "allMails" | "favorite" | "read" | "unread"}
const initialState: filterState = {filter: "allMails"} 

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        chageFilter(state, action) {
            state.filter = action.payload.filterOption
        }
    }
})

export const { chageFilter } = filterSlice.actions

export const selectFilter = (state: RootState) => state.filter.filter

export default filterSlice.reducer
