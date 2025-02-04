import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {applicationStateInitial} from "../ApplicationState.ts";
import {ApplicationConstants} from "../../constants/ApplicationConstants.ts";


export const applicationSlice = createSlice({
    name: 'AuthenticationSlice',
    initialState: applicationStateInitial,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setSessionId: (state, action: PayloadAction<string>) => {
            state.sessionId = action.payload;
            localStorage.setItem(ApplicationConstants.SESSION_ID, state.sessionId);
        }
    }
});

export const {setToken, setIsAuthenticated, setSessionId} = applicationSlice.actions;
export default applicationSlice.reducer;