import {configureStore} from "@reduxjs/toolkit";
import applicationReducer from "../slice/ApplicationSlice.ts"
import {useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        application: applicationReducer
    }
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootStateType>()