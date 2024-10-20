import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchEmailById } from "./emailAPI";
import { RootState } from "../../app/store";

export const emailBodyThunk = createAsyncThunk('slave/fetchEmailBody', async ({id, date}:{id : number | string , date:Date} ) => {
    const response = await fetchEmailById(id);
    return {response, date }
})

interface EmailBody {
    slaveId: number | null;
    emailBody: string | null;
    loading : boolean;
    error: string | null;
    date: Date | null
}

const initialState: EmailBody = {
    slaveId: null,
    emailBody: null,
    loading: false,
    error: null,
    date: null
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
            state.date = null
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
            })
            .addCase(emailBodyThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "No email found"
            })
    }
})

export default slaveSlice.reducer
export const { removeSlaveId } = slaveSlice.actions

export const selectEmailBody = (state: RootState) => state.slave.emailBody
export const selectEmailDate = (state: RootState) => state.slave.date
export const selectSlaveId = (state: RootState) => state.slave.slaveId