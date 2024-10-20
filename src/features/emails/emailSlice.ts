import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchDataFromLocalStorage, addDataToLocalStorage } from "../../utils/persistantStorage"
import { Email, fetchAllEmails } from "./emailAPI"
import { RootState } from "../../app/store";
import { emailMetaData } from "../../utils/persistantStorage";


export const emailThunk = createAsyncThunk('emails/allMails', async (page:number) => {
    const result = await fetchAllEmails(page);
    return result;
})

export interface initialState {
    status: string;
    emails: Email[],
    currentPage: number,
    totalPages: number,
    emailMeta: emailMetaData[],
    slaveId: number | null,
}

const initialState: initialState = {
    status: "idle",
    emails: [],
    currentPage: 1,
    totalPages: 2,
    emailMeta: fetchDataFromLocalStorage(),
    slaveId: null,
}

export const emailSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {

        setPage(state, action) {
            state.currentPage = action.payload;
        },

        readAnEmail: (state, action) => {
            const data = action.payload
            const id = parseInt(data.id)
            
            const targetMeta = state.emailMeta.find(meta => {
                return (typeof meta.id === "string") ? parseInt(meta.id) === id : meta.id === id
            })

            if (targetMeta) {
                targetMeta.read = true // immer will handle it
            } else {
                state.emailMeta.push({ id: id, read: true })
            }
        },

        favoriteAnEmail(state, action) {
            const data = action.payload
            const id = parseInt(data.id)
            
            const targetMeta = state.emailMeta.find(meta => {
                return (typeof meta.id === "string") ? parseInt(meta.id) === id : meta.id === id
            })

            if (targetMeta) {
                targetMeta.favorite = true // immer will handle it
            } else {
                state.emailMeta.push({ id: id, favorite: true })
            }
        }

    },
    extraReducers: builder => {
        builder.addCase(emailThunk.pending, (state, action) => {
            state.status = "pending"
        })
            .addCase(emailThunk.fulfilled, (state, action) => {
                state.emails = [...action.payload]
            })
    }
})

export const { readAnEmail, favoriteAnEmail } = emailSlice.actions;
export const { setPage } = emailSlice.actions

// Seletors 
export const selectAllEmails = (state: RootState) => state.emails.emails
export const selectMetaEmails = (state: RootState) => state.emails.emailMeta
export const selectSlaveId = (state: RootState) => state.emails.slaveId
export const selectCurrentPage = (state: RootState) => state.emails.currentPage
export const selectTotalPages = (state: RootState) => state.emails.totalPages

export default emailSlice.reducer;
