import {useAppDispatch} from "../state/store/store.ts";
import {setBackendConfig} from "../state/slice/BackendConfigSlice.ts";
import React, {useEffect, useState} from "react";
import '../configuratons/property/BackendConfigurationProperty.ts'
import {ApplicationConstants} from "../constants/ApplicationConstants.ts";
import {AuthenticationAPI} from "../service/AuthenticationAPI.ts";
import {setIsAuthenticated, setSessionId, setToken} from "../state/slice/ApplicationSlice.ts";
import {UserServiceAPI} from "../service/UserServiceAPI.ts";
import {IUser, setUser} from "../state/slice/UserSlice.ts";
import Loading from "../components/Loading.tsx";

function ApplicationStartUp(props: { children: React.ReactNode }) {
    const appDispatch = useAppDispatch();
    appDispatch(setBackendConfig({
        baseUrl: 'http://localhost',
        port: 8001,
        userManagementContextPath: '/api'
    }));

    const [loading, setLoading] = useState(true);
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
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [appDispatch, sessionId]);

    return loading ? <Loading/> : (props.children);
}

export default ApplicationStartUp;