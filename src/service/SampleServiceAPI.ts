import axiosInstance from "../configuratons/axios/AxiosConfig.ts";
import {AxiosProgressEvent} from "axios";
import {SamplePriceDTO} from "../model/SamplePrice.ts";

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
        return axiosInstance.get(this.baseUrl + "/v1/samples");
    }

    getSampleAudio(id: number) {
        return axiosInstance.get(this.baseUrl + "/v1/samples/" + id, {responseType: 'blob'});
    }

    uploadSample(formData: FormData, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) {
        return axiosInstance.post(this.baseUrl + "/v1/samples", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

    updateSamplePrice(samplePrice: SamplePriceDTO) {
        return axiosInstance.put(this.baseUrl + "/v1/samples/price", samplePrice);
    }

    getSampleLogo(logo: string) {
        return axiosInstance.get(this.baseUrl + "/samples/logo/" + logo, {responseType: 'blob'});
    }

    getSampleDetail(id: number) {
        return axiosInstance.get(this.baseUrl + "/v1/samples/basic-info/" + id);
    }

    downloadSample(id: number) {
        return axiosInstance.get(this.baseUrl + "/v1/samples/download/" + id, {responseType: 'blob'});
    }
}