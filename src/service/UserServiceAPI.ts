import axiosInstance from "../configuratons/axios/AxiosConfig.ts";
import {AxiosInstance} from "axios";
import {BackendConfigurationProperty} from "../configuratons/property/BackendConfigurationProperty.ts";
import {env} from "../configuratons/property/env.ts";

export class UserServiceAPI {
    private static axios: AxiosInstance = axiosInstance;

    public static getUserProfile() {
        return this.axios.get(BackendConfigurationProperty.getUserManagementFullPath() + env.VITE_USER_PROFILE);
    }

    public static getUserProfilePicture(userId?: number) {
        return this.axios.get(BackendConfigurationProperty.getUserManagementFullPath() + env.VITE_USER_PROFILE_PICTURE + (userId && `?user_id=${userId}`));
    }
}