import {PurchaseType} from "./SamplePrice.ts";

export interface SampleCheckout {
    sampleId: number;
    purchaseType: PurchaseType;
    backUrl: string;
    successUrl: string;
}

export interface Checkout {
    id: string;
    url: string;
}