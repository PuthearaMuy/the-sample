import {OwnerInfo} from "./SampleBasicInfo.ts";
import {SamplePrice} from "./SamplePrice.ts";

export interface ISampleDetail {
    id: number,
    title: string,
    tempo: number,
    sampleType: string,
    type: string,
    key: string,
    createDate: number,
    logo: string,
    description: string,
    ownerInfo: OwnerInfo,
    samplePrices: SamplePrice[],
}