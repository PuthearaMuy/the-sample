import axiosInstance from "../axios/AxiosConfig.ts";

export class SampleServiceAPI {
    private readonly baseUrl: string;
    private static instance: SampleServiceAPI;

    private constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    };

    public static getInstance(): SampleServiceAPI {
        if (!SampleServiceAPI.instance) {
            SampleServiceAPI.instance = new SampleServiceAPI("/src/assets")
        }
        return SampleServiceAPI.instance;
    }

    getSamples() {
        return axiosInstance.get(this.baseUrl + "/sample/sample.json");
    }

    getSampleAudio(url: string) {

        return axiosInstance.get(this.baseUrl + url, {responseType: 'blob'});
    }
}