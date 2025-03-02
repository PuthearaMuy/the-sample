export interface SamplePriceDTO {
    sampleId: number;
    samplePrices: SamplePrice[];
};

export interface SamplePrice {
    type: PurchaseType,
    amount: number,
};

export enum PurchaseType {
    NORMAL = "Normal",
    PREMIUM = "Premium",
    EXCLUSIVE = "Exclusive"
}