import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUser {
    username: string;
    nickname: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    email: string;
    profileName: string;
}

const userInitial: IUser = {
    username: '',
    nickname: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    profileName: '',
}

const userSlice = createSlice({
    name: "UserSlice",
    initialState: userInitial,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            Object.assign(state, action.payload);
        }
    }
});

export const {setUser} = userSlice.actions;
export const userReducer = userSlice.reducer;