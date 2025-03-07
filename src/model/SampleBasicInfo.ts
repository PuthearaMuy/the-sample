export interface SampleBasicInfo {
    id: number;
    description: string;
    ownerInfo: OwnerInfo;
}

export interface OwnerInfo {
    userId: number;
    username: string;
    email: string;
    nickName: string;
}