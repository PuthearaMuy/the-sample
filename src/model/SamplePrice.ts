export interface SamplePriceDTO {
    sampleId: number;
    sampleTitle: string;
    samplePrices: SamplePrice[];
}

export interface SamplePrice {
    type: PurchaseType,
    amount: number,
    soldOption: SoldOption,
    negotiation: boolean,
}

export enum PurchaseType {
    NORMAL = "NORMAL",
    PREMIUM = "PREMIUM",
    EXCLUSIVE = "EXCLUSIVE"
}

export enum SoldOption {
    FREE = "FREE",
    FREE_NON_PROFIT = "FREE_NON_PROFIT",
    SOLD = "SOLD",
}