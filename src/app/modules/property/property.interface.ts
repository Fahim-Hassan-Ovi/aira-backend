import { Types } from "mongoose";

export enum PropertyStatus {
    DRAFT = "DRAFT",
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED"
}

export enum PropertyType {
    APARTMENT = "APARTMENT",
    HOUSE = "HOUSE",
    HOTEL = "HOTEL",
    RESORT = "RESORT"
}

export enum SpaceType {
    COMPLETE = "COMPLETE",
    PRIVATE_ROOM = "PRIVATE_ROOM",
    DORMITORY = "DORMITORY"
}


export interface ICoord {
    lat: number;
    lon: number;
}

export interface IAddOn {
    _id?: Types.ObjectId;
    name: string;
    price: number;
    description?: string;
}

export interface IAvailability {
    _id?: Types.ObjectId;
    checkInTime: string;
    checkOutTime: string;
    bufferDays?: number;
    blockedDates?: Date[];
}

export interface IProperty {
    _id?: Types.ObjectId;
    host: Types.ObjectId;
    title: string;
    description: string;
    status: PropertyStatus;
    propertyType: PropertyType;
    spaceType: SpaceType;
    location: LocationEnum;
    coord: ICoord;
    photos: string[];
    nid?: string;
    documents?: string[];
    amenities: string;
    safetyFeatures: string;
    essentialFacilities: string;
    standoutFacilities: string;
    highlights: string;
    houseRules: string;
    maxGuests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    basePrice: number;
    weekendPrice: number;
    cleaningFee: number;
    serviceFee: number;
    currency: string;
    instantBooking: boolean;
    minNights: number;
    availability: IAvailability;
    specialOffers?: ISpecialOffer[];
    addOns?: IAddOn[];
    isGuestFavorite: boolean;
    averageRating: number;
    totalReviews: number;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
