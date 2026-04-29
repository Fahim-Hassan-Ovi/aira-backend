import z from "zod";
import { LocationEnum, PropertyStatus, PropertyType, SpaceType } from "./property.interface";

const coordZodSchema = z.object({
  lat: z.number({ required_error: "Latitude is required" }),
  lon: z.number({ required_error: "Longitude is required" }),
});

const availabilityZodSchema = z.object({
  checkInTime: z.string({ required_error: "Check-in time is required" }),
  checkOutTime: z.string({ required_error: "Check-out time is required" }),
  bufferDays: z.number().optional(),
  blockedDates: z.array(z.date()).optional(),
});

const specialOfferZodSchema = z.object({
  title: z.string({ required_error: "Offer title is required" }),
  description: z.string().optional(),
  discountPercentage: z.number({ required_error: "Discount percentage is required" }),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
});

const addOnZodSchema = z.object({
  name: z.string({ required_error: "Add-on name is required" }),
  price: z.number({ required_error: "Add-on price is required" }),
  description: z.string().optional(),
});

export const createPropertyZodSchema = z.object({
  host: z.string({ required_error: "Host ID is required" }).optional(),
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters long" }),
  status: z
    .enum(Object.values(PropertyStatus) as [string])
    .optional(),
  propertyType: z
    .enum(Object.values(PropertyType) as [string], {
      required_error: "Property type is required",
    }),
  spaceType: z
    .enum(Object.values(SpaceType) as [string], {
      required_error: "Space type is required",
    }),
  location: z
    .enum(Object.values(LocationEnum) as [string], {
      required_error: "Location is required",
    }),
  coord: coordZodSchema,
  photos: z
    .array(z.string(), { required_error: "At least one photo is required" })
    .min(1, { message: "At least one photo is required" }),
  nid: z.string().optional(),
  documents: z.array(z.string()).optional(),
  amenities: z.string({ required_error: "Amenities are required" }),
  safetyFeatures: z.string({ required_error: "Safety features are required" }),
  essentialFacilities: z.string({ required_error: "Essential facilities are required" }),
  standoutFacilities: z.string({ required_error: "Standout facilities are required" }),
  highlights: z.string({ required_error: "Highlights are required" }),
  houseRules: z.string({ required_error: "House rules are required" }),
  maxGuests: z
    .number({ required_error: "Max guests is required" })
    .min(1, { message: "Max guests must be at least 1" }),
  bedrooms: z
    .number({ required_error: "Bedrooms is required" })
    .min(0, { message: "Bedrooms cannot be negative" }),
  beds: z
    .number({ required_error: "Beds is required" })
    .min(1, { message: "Beds must be at least 1" }),
  bathrooms: z
    .number({ required_error: "Bathrooms is required" })
    .min(1, { message: "Bathrooms must be at least 1" }),
  basePrice: z
    .number({ required_error: "Base price is required" })
    .min(0, { message: "Base price cannot be negative" }),
  weekendPrice: z
    .number({ required_error: "Weekend price is required" })
    .min(0, { message: "Weekend price cannot be negative" }),
  cleaningFee: z
    .number({ required_error: "Cleaning fee is required" })
    .min(0, { message: "Cleaning fee cannot be negative" }),
  serviceFee: z
    .number({ required_error: "Service fee is required" })
    .min(0, { message: "Service fee cannot be negative" }),
  currency: z.string().optional(),
  instantBooking: z.boolean().optional(),
  minNights: z
    .number({ required_error: "Minimum nights is required" })
    .min(1, { message: "Minimum nights must be at least 1" }),
  availability: availabilityZodSchema,
  specialOffers: z.array(specialOfferZodSchema).optional(),
  addOns: z.array(addOnZodSchema).optional(),
});

export const updatePropertyZodSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" })
    .optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .optional(),
  status: z
    .enum(Object.values(PropertyStatus) as [string])
    .optional(),
  propertyType: z
    .enum(Object.values(PropertyType) as [string])
    .optional(),
  spaceType: z
    .enum(Object.values(SpaceType) as [string])
    .optional(),
  location: z
    .enum(Object.values(LocationEnum) as [string])
    .optional(),
  coord: coordZodSchema.optional(),
  photos: z.array(z.string()).optional(),
  nid: z.string().optional(),
  documents: z.array(z.string()).optional(),
  amenities: z.string().optional(),
  safetyFeatures: z.string().optional(),
  essentialFacilities: z.string().optional(),
  standoutFacilities: z.string().optional(),
  highlights: z.string().optional(),
  houseRules: z.string().optional(),
  maxGuests: z.number().min(1).optional(),
  bedrooms: z.number().min(0).optional(),
  beds: z.number().min(1).optional(),
  bathrooms: z.number().min(1).optional(),
  basePrice: z.number().min(0).optional(),
  weekendPrice: z.number().min(0).optional(),
  cleaningFee: z.number().min(0).optional(),
  serviceFee: z.number().min(0).optional(),
  currency: z.string().optional(),
  instantBooking: z.boolean().optional(),
  minNights: z.number().min(1).optional(),
  availability: availabilityZodSchema.optional(),
  specialOffers: z.array(specialOfferZodSchema).optional(),
  addOns: z.array(addOnZodSchema).optional(),
});
