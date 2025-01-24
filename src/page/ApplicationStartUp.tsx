import {useAppDispatch} from "../state/store/store.ts";
import {setBackendConfig} from "../state/slice/BackendConfigSlice.ts";
import React from "react";
import '../configuratons/property/BackendConfigurationProperty.ts'

function ApplicationStartUp(props: { children: React.ReactNode }) {
    const appDispatch = useAppDispatch();
    appDispatch(setBackendConfig({
        baseUrl: 'http://localhost',
        port: 8001,
        userManagementContextPath: '/api'
    }))
    return (props.children);
}

export default ApplicationStartUp;