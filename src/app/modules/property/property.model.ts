import { model, Schema } from "mongoose";
import {
  IAddOn,
  IAvailability,
  ICoord,
  IProperty,
  ISpecialOffer,
  LocationEnum,
  PropertyStatus,
  PropertyType,
  SpaceType,
} from "./property.interface";

const coordSchema = new Schema<ICoord>(
  {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const availabilitySchema = new Schema<IAvailability>(
  {
    checkInTime: { type: String, required: true },
    checkOutTime: { type: String, required: true },
    bufferDays: { type: Number, default: 0 },
    blockedDates: [{ type: Date }],
  },
  {
    versionKey: false,
    _id: false,
  }
);

const specialOfferSchema = new Schema<ISpecialOffer>(
  {
    title: { type: String, required: true },
    description: { type: String },
    discountPercentage: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const addOnSchema = new Schema<IAddOn>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const propertySchema = new Schema<IProperty>(
  {
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PropertyStatus),
      default: PropertyStatus.DRAFT,
    },
    propertyType: {
      type: String,
      enum: Object.values(PropertyType),
      required: true,
    },
    spaceType: {
      type: String,
      enum: Object.values(SpaceType),
      required: true,
    },
    location: {
      type: String,
      enum: Object.values(LocationEnum),
      required: true,
    },
    coord: {
      type: coordSchema,
      required: true,
    },
    photos: [
      {
        type: String,
        required: true,
      },
    ],
    nid: {
      type: String,
    },
    documents: [
      {
        type: String,
      },
    ],
    amenities: {
      type: String,
      required: true,
    },
    safetyFeatures: {
      type: String,
      required: true,
    },
    essentialFacilities: {
      type: String,
      required: true,
    },
    standoutFacilities: {
      type: String,
      required: true,
    },
    highlights: {
      type: String,
      required: true,
    },
    houseRules: {
      type: String,
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    weekendPrice: {
      type: Number,
      required: true,
    },
    cleaningFee: {
      type: Number,
      required: true,
    },
    serviceFee: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    instantBooking: {
      type: Boolean,
      default: false,
    },
    minNights: {
      type: Number,
      required: true,
    },
    availability: {
      type: availabilitySchema,
      required: true,
    },
    specialOffers: [specialOfferSchema],
    addOns: [addOnSchema],
    isGuestFavorite: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

propertySchema.index({ coord: "2dsphere" });
propertySchema.index({ host: 1 });
propertySchema.index({ location: 1 });
propertySchema.index({ status: 1 });

export const Property = model<IProperty>("Property", propertySchema);
