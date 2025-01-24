import {BackendConfigurationProperty} from "../configuratons/property/BackendConfigurationProperty.ts";

export class AuthenticationAPI {
    public static getGoogleAuthenticationUrl(): string {
        return BackendConfigurationProperty.getUserManagementFullPath() + "/oauth2/authorization/google";
    }
}