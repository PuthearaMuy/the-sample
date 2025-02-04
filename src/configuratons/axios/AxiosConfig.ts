import axios from "axios";
import {store} from "../../state/store/store.ts";
import {ApplicationState} from "../../state/ApplicationState.ts";
import {ApplicationConstants} from "../../constants/ApplicationConstants.ts";

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
    if (application) {
        if (application.accessToken) {
            config.headers['Authorization'] = 'Bearer ' + application?.accessToken;
        }
        if (application.sessionId) {
            config.headers[ApplicationConstants.SESSION_ID] = application.sessionId;

        }
    }

    return config;
});

export default axiosInstance;