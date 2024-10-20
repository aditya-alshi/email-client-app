import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchEmailById } from "./emailAPI";
import { RootState } from "../../app/store";

export const emailBodyThunk = createAsyncThunk('slave/fetchEmailBody', async ({id, date, favorite}:{id : number | string , date:Date, favorite: boolean} ) => {
    const response = await fetchEmailById(id);
    return {response, date, favorite }
})

interface EmailBody {
    slaveId: number | null;
    emailBody: string | null;
    loading : boolean;
    error: string | null;
    date: Date | null;
    favorite: boolean
}

const initialState: EmailBody = {
    slaveId: null,
    emailBody: null,
    loading: false,
    error: null,
    date: null,
    favorite: false
}

const slaveSlice = createSlice({
    name: "slave",
    initialState,
    reducers: {
        removeSlaveId(state) {
            state.slaveId = null;
            state.emailBody = null;
            state.loading = false;
            state.error = null;
            state.date = null;
            state.favorite = false
        },
        favoriteTheSlave(state){
            state.favorite = true;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(emailBodyThunk.pending, state => {
                state.loading = true;
                state.error = null;
                state.emailBody = null;
            })
            .addCase(emailBodyThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.emailBody = action.payload.response.body;
                state.slaveId = action.payload.response.id;
                state.date = action.payload.date
                state.favorite = action.payload.favorite
            })
            .addCase(emailBodyThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "No email found"
            })
    }
})

export default slaveSlice.reducer
export const { removeSlaveId, favoriteTheSlave } = slaveSlice.actions

export const selectEmailBody = (state: RootState) => state.slave.emailBody
export const selectEmailDate = (state: RootState) => state.slave.date
export const selectSlaveId = (state: RootState) => state.slave.slaveId
export const selectFavorite = (state: RootState) => state.slave.favorite