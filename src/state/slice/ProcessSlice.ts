import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Processing {
    process: number;
}

const initialProcessing: Processing = {
    process: -1,
}

const processSlice = createSlice({
        name: "ProcessSlice",
        initialState: initialProcessing,
        reducers: {
            setProcess: (state, action: PayloadAction<Processing>) => {
                Object.assign(state, action.payload);
            }
        }
    })
;

export const {setProcess} = processSlice.actions;
export const processReducer = processSlice.reducer;