import axiosInstance from "../configuratons/axios/AxiosConfig.ts";
import {AxiosProgressEvent} from "axios";

export class SampleServiceAPI {
    private readonly baseUrl: string;
    private static instance: SampleServiceAPI;

    private constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    };

    public static getInstance(): SampleServiceAPI {
        if (!SampleServiceAPI.instance) {
            SampleServiceAPI.instance = new SampleServiceAPI("http://localhost:8002/api");
        }
        return SampleServiceAPI.instance;
    }

    getSamples() {
        return axiosInstance.get(this.baseUrl + "/v1/sample");
    }

    getSampleAudio(url: string) {
        return axiosInstance.get(url, {responseType: 'blob'});
    }

    uploadSample(formData: FormData, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) {
        return axiosInstance.post(this.baseUrl + "/v1/sample", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

    getSampleLogo(logo: string) {
        return axiosInstance.get(this.baseUrl + "/v1/sample/logo/" + logo, {responseType: 'blob'});
    }

    getSampleDetail(id: number) {
        return axiosInstance.get(this.baseUrl + "/v1/sample/detail/" + id);
    }

    downloadSample(id: number) {
        return axiosInstance.get(this.baseUrl + "/v1/sample/download/" + id, {responseType: 'blob'});
    }
}