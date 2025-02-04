export interface ApplicationState {
    accessToken: string;
    isAuthenticated: boolean;
    sessionId: string;
}

export const applicationStateInitial: ApplicationState = {
    accessToken: '',
    isAuthenticated: false,
    sessionId: '',
}