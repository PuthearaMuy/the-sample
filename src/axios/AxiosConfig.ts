import axios from "axios";
import {store} from "../state/store/store.ts";
import {ApplicationState} from "../state/ApplicationState.ts";

let application: ApplicationState | undefined = undefined;

store.subscribe(() => {
    const applicationState = store.getState().application;
    if (applicationState) {
        application = applicationState;
    }
});

const axiosInstance = axios.create({
    baseURL: "",
    timeout: 50000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use((config) => {
    config.headers['Authorization'] = 'Bearer ' + application?.accessToken;
    return config;
});

export default axiosInstance;