import {store} from "../../state/store/store.ts";

store.subscribe(() => {
    const backendConfig = store.getState().backendConfig;
    if (backendConfig) {
        BackendConfigurationProperty.baseUrl = backendConfig.baseUrl;
        BackendConfigurationProperty.port = backendConfig.port;
        BackendConfigurationProperty.userManagementContextPath = backendConfig.userManagementContextPath;
    }
})

export class BackendConfigurationProperty {
    public static baseUrl: string = "";
    public static port: number = -1;
    public static userManagementContextPath: string = "";

    public static getUserManagementFullPath(): string {
        return this.baseUrl + (this.port > 0 && `:${this.port}`) + this.userManagementContextPath;
    };
}