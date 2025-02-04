import {useAppDispatch} from "../state/store/store.ts";
import {setBackendConfig} from "../state/slice/BackendConfigSlice.ts";
import React, {useEffect} from "react";
import '../configuratons/property/BackendConfigurationProperty.ts'
import {ApplicationConstants} from "../constants/ApplicationConstants.ts";
import {AuthenticationAPI} from "../service/AuthenticationAPI.ts";
import {setIsAuthenticated, setSessionId, setToken} from "../state/slice/ApplicationSlice.ts";
import {UserServiceAPI} from "../service/UserServiceAPI.ts";
import {IUser, setUser} from "../state/slice/UserSlice.ts";

function ApplicationStartUp(props: { children: React.ReactNode }) {
    const appDispatch = useAppDispatch();
    appDispatch(setBackendConfig({
        baseUrl: 'http://localhost',
        port: 8001,
        userManagementContextPath: '/api'
    }));

    const sessionId = localStorage.getItem(ApplicationConstants.SESSION_ID);

    useEffect(() => {
        if (sessionId) {
            AuthenticationAPI.getRefreshToken(sessionId).then((res) => {
                const data = res.data;
                appDispatch(setToken(data.access_token));
                appDispatch(setSessionId(sessionId));

                UserServiceAPI.getUserProfile().then(value => {
                    const user = value.data as IUser;
                    appDispatch(setUser(user));
                    appDispatch(setIsAuthenticated(true));
                });
            });
        }
    }, [appDispatch, sessionId]);

    return (props.children);
}

export default ApplicationStartUp;