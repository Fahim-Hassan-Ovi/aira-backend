/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelpers/AppError";
import { IProperty } from "./property.interface";
import { Property } from "./property.model";
import httpStatus from "http-status-codes";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { propertySearchableFields } from "./property.constant";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";

const createProperty = async (payload: Partial<IProperty>, userId: string) => {
  const propertyData = {
    ...payload,
    host: userId,
  };

  const property = await Property.create(propertyData);
  return property;
};

const getAllProperties = async (query: Record<string, any>) => {
  const propertyQuery = new QueryBuilder(
    Property.find({ isDeleted: false }).populate("host", "name email phone picture"),
    query
  )
    .search(propertySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await propertyQuery.modelQuery;
  const total = await propertyQuery.countTotal();

  return {
    data: result,
    meta: {
      total,
      page: propertyQuery.page,
      limit: propertyQuery.limit,
    },
  };
};

const getPropertyById = async (id: string) => {
  const property = await Property.findById(id).populate(
    "host",
    "name email phone picture bio"
  );

  if (!property || property.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Property not found");
  }

  return property;
};

const getHostProperties = async (userId: string, query: Record<string, any>) => {
  const propertyQuery = new QueryBuilder(
    Property.find({ host: userId, isDeleted: false }),
    query
  )
    .search(propertySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await propertyQuery.modelQuery;
  const total = await propertyQuery.countTotal();

  return {
    data: result,
    meta: {
      total,
      page: propertyQuery.page,
      limit: propertyQuery.limit,
    },
  };
};

const updateProperty = async (
  id: string,
  userId: string,
  payload: Partial<IProperty>
) => {
  const property = await Property.findById(id);

  if (!property || property.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Property not found");
  }

  if (property.host.toString() !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized to update this property");
  }

  // Handle photo deletion - delete old photos from Cloudinary if they're being replaced
  if (payload.photos && payload.photos.length > 0) {
    const oldPhotos = property.photos || [];
    const newPhotos = payload.photos;

    // Find photos that are being removed
    const photosToDelete = oldPhotos.filter((photo) => !newPhotos.includes(photo));

    // Delete from Cloudinary
    for (const photo of photosToDelete) {
      await deleteImageFromCLoudinary(photo);
    }
  }

  // Handle NID deletion
  if (payload.nid !== undefined && payload.nid !== property.nid) {
    if (property.nid) {
      await deleteImageFromCLoudinary(property.nid);
    }
  }

  // Handle documents deletion
  if (payload.documents && payload.documents.length > 0) {
    const oldDocuments = property.documents || [];
    const newDocuments = payload.documents;

    const documentsToDelete = oldDocuments.filter((doc) => !newDocuments.includes(doc));

    for (const doc of documentsToDelete) {
      await deleteImageFromCLoudinary(doc);
    }
  }

  const updatedProperty = await Property.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedProperty;
};

const deleteProperty = async (id: string, userId: string) => {
  const property = await Property.findById(id);

  if (!property || property.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Property not found");
  }

  if (property.host.toString() !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized to delete this property");
  }

  // Delete all images from Cloudinary
  if (property.photos && property.photos.length > 0) {
    for (const photo of property.photos) {
      await deleteImageFromCLoudinary(photo);
    }
  }

  if (property.nid) {
    await deleteImageFromCLoudinary(property.nid);
  }

  if (property.documents && property.documents.length > 0) {
    for (const doc of property.documents) {
      await deleteImageFromCLoudinary(doc);
    }
  }

  // Soft delete
  const deletedProperty = await Property.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  return deletedProperty;
};

const getNearestProperties = async (
  lat: number,
  lon: number,
  maxDistance: number = 5000,
  query: Record<string, any>
) => {
  const propertyQuery = new QueryBuilder(
    Property.find({
      isDeleted: false,
      coord: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lon, lat],
          },
          $maxDistance: maxDistance,
        },
      },
    }).populate("host", "name picture"),
    query
  )
    .sort()
    .paginate()
    .fields();

  const result = await propertyQuery.modelQuery;
  const total = await propertyQuery.countTotal();

  return {
    data: result,
    meta: {
      total,
      page: propertyQuery.page,
      limit: propertyQuery.limit,
    },
  };
};

const updatePropertyRating = async (
  propertyId: string,
  averageRating: number,
  totalReviews: number
) => {
  const property = await Property.findByIdAndUpdate(
    propertyId,
    {
      averageRating,
      totalReviews,
    },
    { new: true }
  );

  return property;
};

const toggleGuestFavorite = async (id: string, userId: string) => {
  const property = await Property.findById(id);

  if (!property || property.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Property not found");
  }

  // This is a placeholder - you might want to track favorites in a separate collection
  const updatedProperty = await Property.findByIdAndUpdate(
    id,
    { isGuestFavorite: !property.isGuestFavorite },
    { new: true }
  );

  return updatedProperty;
};

export const PropertyServices = {
  createProperty,
  getAllProperties,
  getPropertyById,
  getHostProperties,
  updateProperty,
  deleteProperty,
  getNearestProperties,
  updatePropertyRating,
  toggleGuestFavorite,
};
