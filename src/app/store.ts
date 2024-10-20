import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "../features/emails/emailSlice";
import slaveReducer from "../features/emails/slaveSlice";
import filterReducer from "../features/filters/filterSlice"

export const store = configureStore({
    reducer: {
        emails: emailReducer,
        slave : slaveReducer,
        filter: filterReducer
    }
})

export type emailStore = typeof store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<emailStore['getState']>