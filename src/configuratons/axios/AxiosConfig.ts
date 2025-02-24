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
    fetchOptions: {
        retries: true,
        maxRetries: 5,
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

interface FailedRequests {
    resolve: (value: AxiosResponse) => void;
    reject: (value: AxiosError) => void;
    config: AxiosRequestConfig;
    error: AxiosError;
}

let failedRequests: FailedRequests[] = [];
let isTokenRefreshing = false;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const status = error.response?.status;
        const originalRequestConfig = error.config!;

        if (status !== 401) {
            return Promise.reject(error);
        }

        if (isTokenRefreshing) {
            return new Promise((resolve, reject) => {
                failedRequests.push({
                    resolve,
                    reject,
                    config: originalRequestConfig,
                    error: error,
                });
            });
        }

        const sessionId = localStorage.getItem(ApplicationConstants.SESSION_ID);
        isTokenRefreshing = true;

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
            return Promise.reject(error);
        } finally {
            failedRequests = [];
            isTokenRefreshing = false;
        }

        return axiosInstance(originalRequestConfig);
    }
);

export default axiosInstance;