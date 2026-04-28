import { Types } from "mongoose";

export enum Role {
    GUEST = "GUEST",
    HOST = "HOST",
    ADMIN = "ADMIN"
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = " BLOCKED"
}

export interface IAuthProvider {
    provider: "google" | "credentials" | "apple";
    providerId: string;
}

export interface ICoord {
    lat: number;
    lon: number;
}

export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    phone?: string;
    password?: string;
    picture?: string;
    fcmToken?: string;
    coord?: ICoord;
    isDeleted?: boolean;
    isActive?: IsActive;
    isVerified?: boolean;
    totalStays?: number;
    averageRating?: number;
    language?: string;
    currency?: string;
    bio?: string;
    birthday?: Date;
    education?: string;
    profession?: string;
    languages?: string[];
    hostingStyle?: string[];
    payoutMethod?: Types.ObjectId;
    otp?: string;
    role: Role;
    auths: IAuthProvider[];
    createdAt?: Date;
    updatedAt?: Date;
}