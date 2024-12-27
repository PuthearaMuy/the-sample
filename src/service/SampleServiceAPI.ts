import axiosInstance from "../axios/AxiosConfig.ts";

export class SampleServiceAPI {
    private readonly baseUrl: string;
    private static instance: SampleServiceAPI;

    private constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    };

    public static getInstance(): SampleServiceAPI {
        if (!SampleServiceAPI.instance) {
            SampleServiceAPI.instance = new SampleServiceAPI("http://localhost:8002/api/v1")
        }
        return SampleServiceAPI.instance;
    }

    getSamples() {
        return axiosInstance.get(this.baseUrl + "/sample");
    }

    getSampleAudio(id: number) {

        return axiosInstance.get(this.baseUrl + "/sample/" + id, {responseType: 'blob'});
    }
}