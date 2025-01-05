export interface ApplicationState {
    accessToken: string;
    isAuthenticated: boolean;
}

export const applicationStateInitial: ApplicationState = {
    accessToken: '',
    isAuthenticated: false,
}