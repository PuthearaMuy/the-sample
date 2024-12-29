export interface AppContext {
    applicationName: string;
    token?: string;
    playingId: number;
    setPlayingId: (id: number) => void;
}