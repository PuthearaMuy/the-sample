import {BackendConfigurationProperty} from "../configuratons/property/BackendConfigurationProperty.ts";
import {AxiosInstance} from "axios";
import axiosInstance from "../configuratons/axios/AxiosConfig.ts";

export class AuthenticationAPI {
    private static axios: AxiosInstance = axiosInstance;

    public static getGoogleAuthenticationUrl(): string {
        return BackendConfigurationProperty.getUserManagementFullPath() + "/oauth2/authorization/google";
    }

    public static getRefreshToken(sessionId: string) {
        return this.axios.post(BackendConfigurationProperty.getUserManagementFullPath() + "/auth/refresh/" + sessionId);
    }
}