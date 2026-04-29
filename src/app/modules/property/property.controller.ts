/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { PropertyServices } from "./property.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const decodedToken = req.user as JwtPayload;
  
  // Handle multiple file uploads
  const photos: string[] = [];
  let nid: string | undefined;
  const documents: string[] = [];

  if (req.files && typeof req.files === "object" && !Array.isArray(req.files)) {
    // Handle photos array
    if (req.files.photos) {
      const photosFiles = Array.isArray(req.files.photos)
        ? req.files.photos
        : [req.files.photos];
      photosFiles.forEach((file: any) => {
        photos.push(file.path);
      });
    }

    // Handle NID
    if (req.files.nid) {
      const nidFile = Array.isArray(req.files.nid) ? req.files.nid[0] : req.files.nid;
      nid = nidFile.path;
    }

    // Handle documents array
    if (req.files.documents) {
      const documentsFiles = Array.isArray(req.files.documents)
        ? req.files.documents
        : [req.files.documents];
      documentsFiles.forEach((file: any) => {
        documents.push(file.path);
      });
    }
  }

  const propertyData = {
    ...req.body,
    photos,
    nid,
    documents: documents.length > 0 ? documents : undefined,
  };

  const property = await PropertyServices.createProperty(propertyData, decodedToken.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Property created successfully",
    data: property,
  });
});

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await PropertyServices.getAllProperties(req.query as Record<string, any>);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Properties retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getPropertyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const property = await PropertyServices.getPropertyById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property retrieved successfully",
    data: property,
  });
});

const getHostProperties = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;

  const result = await PropertyServices.getHostProperties(
    decodedToken.userId,
    req.query as Record<string, any>
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Host properties retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const updateProperty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const decodedToken = req.user as JwtPayload;

  // Handle multiple file uploads
  const photos: string[] = req.body.photos ? JSON.parse(req.body.photos) : [];
  let nid: string | undefined = req.body.nid;
  const documents: string[] = req.body.documents ? JSON.parse(req.body.documents) : [];

  if (req.files && typeof req.files === "object" && !Array.isArray(req.files)) {
    if (req.files.photos) {
      const photosFiles = Array.isArray(req.files.photos)
        ? req.files.photos
        : [req.files.photos];
      photosFiles.forEach((file: any) => {
        photos.push(file.path);
      });
    }

    if (req.files.nid) {
      const nidFile = Array.isArray(req.files.nid) ? req.files.nid[0] : req.files.nid;
      nid = nidFile.path;
    }

    if (req.files.documents) {
      const documentsFiles = Array.isArray(req.files.documents)
        ? req.files.documents
        : [req.files.documents];
      documentsFiles.forEach((file: any) => {
        documents.push(file.path);
      });
    }
  }

  const propertyData = {
    ...req.body,
    photos: photos.length > 0 ? photos : undefined,
    nid,
    documents: documents.length > 0 ? documents : undefined,
  };

  const property = await PropertyServices.updateProperty(id, decodedToken.userId, propertyData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property updated successfully",
    data: property,
  });
});

const deleteProperty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const decodedToken = req.user as JwtPayload;

  await PropertyServices.deleteProperty(id, decodedToken.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property deleted successfully",
    data: null,
  });
});

const getNearestProperties = catchAsync(async (req: Request, res: Response) => {
  const { lat, lon, maxDistance } = req.query;

  const result = await PropertyServices.getNearestProperties(
    parseFloat(lat as string),
    parseFloat(lon as string),
    maxDistance ? parseInt(maxDistance as string) : 5000,
    req.query as Record<string, any>
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Nearest properties retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const toggleGuestFavorite = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const decodedToken = req.user as JwtPayload;

  const property = await PropertyServices.toggleGuestFavorite(id, decodedToken.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Guest favorite toggled successfully",
    data: property,
  });
});

export const PropertyControllers = {
  createProperty,
  getAllProperties,
  getPropertyById,
  getHostProperties,
  updateProperty,
  deleteProperty,
  getNearestProperties,
  toggleGuestFavorite,
};
