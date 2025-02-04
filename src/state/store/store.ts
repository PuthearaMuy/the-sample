import {configureStore} from "@reduxjs/toolkit";
import applicationReducer from "../slice/ApplicationSlice.ts"
import backEndConfigReducer from "../slice/BackendConfigSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {userReducer} from "../slice/UserSlice.ts";

export const store = configureStore({
    reducer: {
        application: applicationReducer,
        backendConfig: backEndConfigReducer,
        user: userReducer,
    }
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootStateType>();