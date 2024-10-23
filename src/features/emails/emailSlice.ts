import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchDataFromLocalStorage, addDataToLocalStorage } from "../../utils/persistantStorage"
import { Email, fetchAllEmails } from "./emailAPI"
import { RootState } from "../../app/store";
import { emailMetaData } from "../../utils/persistantStorage";

// emailThunk will fetch the emails. Return from the fetchAllEmails(page) will only have list of all the mails
// with array of object. 
export const emailThunk = createAsyncThunk('emails/allMails', async (page:number | null) => {
    const result = await fetchAllEmails(page); // only returns the list
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
    status: "idle", // Special for thunk

    emails: [], // the array of email coming as thunk response will be stored here

    currentPage: 1, // This is for pagination. When pagination related action will be triggered, this will change. 
    totalPages: 2, // Again for pagination purpose. Since we only have 2 pages for now it doesn't make much sense, but
                   // But once we get more pages the totalPages property is going to be very helpful 
    
    emailMeta: fetchDataFromLocalStorage(), 
    // This is interesting 
    // On the initial load we want to load the emailMeta, means read and favorite status of each mail. And that meta
    // is stored in the Local Storage so the initial state itself will load it. 
    // now emailMeta is holding the current state which is nothing but the Local storage. 
    // so whatever status change we do on mails, like read or favorite, it will be stored in the emailMeta. 
    // And also read from meta data.
    // This way we don't need to load the localStorage every time any state change happed for emailMeta. 
    // Notice the fetchDataFromLocalStorage is only called on initial load. 

    slaveId: null, 
    // This will be used by the master specifically.
}

export const emailSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {

        setPage(state, action) {
            // action.payload is nothing but a page number(1 or 2)
            state.currentPage = action.payload;
        },

        readAnEmail: (state, action) => {

            // the idea here is to received the id of the mail which has been clicked
            // Now look into the emailMeta array and find if the id exist. 
            // if it already exist means the email is already been read. So there's no need to change the state. 

            const data = action.payload // this payload will specifically contain the id of mail clicked on
            const id = parseInt(data.id)
            
            const targetMeta = state.emailMeta.find(meta => { // Will check if it exist in the emailMeta array
                return (typeof meta.id === "string") ? parseInt(meta.id) === id : meta.id === id
            })

            if (!targetMeta) { // only if it does not exist, append it. 
                state.emailMeta.push({ id: id, read: true })
            } 
        },

        favoriteAnEmail(state, action) {

            // the idea here is to received the id of the slave where the 'Mark as favorite' been clicked on
            // For now the favoriting an email feature is only appied to the read emails. 
            // so for email to be favorited it need to be read
            // it's already in the emailMeta. We don't need to check for it's existence. 
            // what we need to check is, if it has already been favorited. Because if it is, We don't have to change the state.

            const data = action.payload
            const id = parseInt(data.id)
            
            const targetMeta = state.emailMeta.find(meta => { // find out, which meta we are suppose to mutate, by it's id
                return (typeof meta.id === "string") ? parseInt(meta.id) === id : meta.id === id
            })

            if (targetMeta && !targetMeta.favorite) { 
                // the targetMeta that's been known, is not a sepatate object, but it's a reference to the original
                // this is the reason why we can directly mutate it in the emailMeta itself.
                targetMeta.favorite = true // immer will handle it
            } 
        }

    },
    extraReducers: builder => {
        builder.addCase(emailThunk.pending, (state, action) => {
            state.status = "pending"
        })
            .addCase(emailThunk.fulfilled, (state, action) => {
                // this emailThunk payload is either whole data(which not been used nor is recomended) 
                // or the page no for which it has been called on. 
                state.emails = [...action.payload]
            })
    }
})

export const { readAnEmail, favoriteAnEmail } = emailSlice.actions; // these are the action creators automatically given to us by redux toolkit
export const { setPage } = emailSlice.actions

// Seletors 
export const selectAllEmails = (state: RootState) => state.emails.emails
export const selectMetaEmails = (state: RootState) => state.emails.emailMeta
export const selectSlaveId = (state: RootState) => state.emails.slaveId
export const selectCurrentPage = (state: RootState) => state.emails.currentPage
export const selectTotalPages = (state: RootState) => state.emails.totalPages

export default emailSlice.reducer;



