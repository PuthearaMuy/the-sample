import {SoldOption} from "./SamplePrice.ts";

export interface Sample {
    id: number,
    key: string,
    ownerId: number,
    sampleType: string,
    tempo: number,
    title: string,
    type: string,
    url: string
    createDate: number,
    logo: string,
    soldOption: SoldOption,
}