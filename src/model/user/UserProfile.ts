export interface UserProfile {
    profilePic?: Blob;
    username: string;
    nickname: string;
    phone: string;
    email: string;
    gender: string;
    dateOfBirth: string;
}

export interface UserProfileDetail extends UserProfile {
    description: string;
    follower: number;
    following: boolean;
}