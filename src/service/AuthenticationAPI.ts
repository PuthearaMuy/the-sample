import {BackendConfigurationProperty} from "../configuratons/property/BackendConfigurationProperty.ts";
import {AxiosInstance} from "axios";
import axiosInstance from "../configuratons/axios/AxiosConfig.ts";

export class AuthenticationAPI {
    private static axios: AxiosInstance = axiosInstance;

    public static getRefreshToken(sessionId: string) {
        return this.axios.post(BackendConfigurationProperty.getUserManagementFullPath() + "/auth/refresh/" + sessionId);
    }

    public static logoutUrl(sessionId: string, redirectUrl: string) {
        return BackendConfigurationProperty.getUserManagementFullPath() + "/auth/logout/" + sessionId + '?redirect_uri=' + redirectUrl;
    }
}