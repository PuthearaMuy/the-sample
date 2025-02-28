import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {store} from "../../state/store/store.ts";
import {ApplicationState} from "../../state/ApplicationState.ts";
import {ApplicationConstants} from "../../constants/ApplicationConstants.ts";
import {setToken} from "../../state/slice/ApplicationSlice.ts";
import {BackendConfigurationProperty} from "../property/BackendConfigurationProperty.ts";

let application: ApplicationState | undefined = undefined;

store.subscribe(() => {
    const applicationState = store.getState().application;
    if (applicationState) {
        application = applicationState;
    }
});

const axiosInstance = axios.create({
    baseURL: "",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
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

interface FailedRequests {
    resolve: (value: AxiosResponse) => void;
    reject: (value: AxiosError) => void;
    config: AxiosRequestConfig;
    error: AxiosError;
}

let failedRequests: FailedRequests[] = [];

async function refreshToken() {
    const sessionId = localStorage.getItem(ApplicationConstants.SESSION_ID);

    try {
        if (sessionId) {
            const response = await axiosInstance.post(BackendConfigurationProperty.getUserManagementFullPath() + "/auth/refresh/" + sessionId);
            const {access_token} = response.data ?? {};

            if (!access_token) {
                throw new Error(
                    "Something went wrong while refreshing your access token"
                );
            }
            store.dispatch(setToken(access_token));

            failedRequests.forEach(({resolve, reject, config}) => {
                axiosInstance(config)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
            });
        }
    } catch (_error: unknown) {
        console.error(_error);
        failedRequests.forEach(({reject, error}) => reject(error));
        document.cookie = '';
        localStorage.clear();
    } finally {
        failedRequests = [];
    }
}

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const status = error.response?.status;
        const originalRequestConfig = error.config!;

        if (status === 401) {
            if (error.config?.url?.includes("/auth/refresh")) {
                failedRequests = [];
                return Promise.reject(error);
            }
            return new Promise((resolve, reject) => {
                failedRequests.push({
                    resolve,
                    reject,
                    config: originalRequestConfig,
                    error: error,
                });
                refreshToken();
            });
        } else {
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;