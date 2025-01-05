import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {applicationStateInitial} from "../ApplicationState.ts";


export const applicationSlice = createSlice({
    name: 'AuthenticationSlice',
    initialState: applicationStateInitial,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        }
    }
});

export const {setToken, setIsAuthenticated} = applicationSlice.actions;
export default applicationSlice.reducer;