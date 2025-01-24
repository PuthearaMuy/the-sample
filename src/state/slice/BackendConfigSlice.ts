import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface BackendConfig {
    baseUrl: string;
    port: number;
    userManagementContextPath: string;
}

const initialState: BackendConfig = {
    baseUrl: '',
    port: 0,
    userManagementContextPath: '',
}

const backendConfigSlice = createSlice({
    name: 'BackendConfigurationSlice',
    initialState,
    reducers: {
        setBackendConfig: (state, action: PayloadAction<BackendConfig>) => {
            Object.assign(state, action.payload);
        }
    }
});

export const {setBackendConfig} = backendConfigSlice.actions;
export default backendConfigSlice.reducer;