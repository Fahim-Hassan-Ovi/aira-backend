/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { PropertyControllers } from "./property.controller";
import { createPropertyZodSchema, updatePropertyZodSchema } from "./property.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { multerUpload } from "../../config/multer.config";

const router = Router();

// Create property - HOST only
router.post(
  "/",
  checkAuth(Role.HOST),
  multerUpload.fields([
    { name: "photos", maxCount: 10 },
    { name: "nid", maxCount: 1 },
    { name: "documents", maxCount: 5 },
  ]),
  validateRequest(createPropertyZodSchema),
  PropertyControllers.createProperty
);

// Get all properties - PUBLIC
router.get("/", PropertyControllers.getAllProperties);

// Get nearest properties - PUBLIC
router.get("/nearest", PropertyControllers.getNearestProperties);

// Get host's properties - HOST only
router.get(
  "/my-properties",
  checkAuth(Role.HOST),
  PropertyControllers.getHostProperties
);

// Get single property - PUBLIC
router.get("/:id", PropertyControllers.getPropertyById);

// Update property - HOST only
router.patch(
  "/:id",
  checkAuth(Role.HOST),
  multerUpload.fields([
    { name: "photos", maxCount: 10 },
    { name: "nid", maxCount: 1 },
    { name: "documents", maxCount: 5 },
  ]),
  validateRequest(updatePropertyZodSchema),
  PropertyControllers.updateProperty
);

// Delete property - HOST only
router.delete(
  "/:id",
  checkAuth(Role.HOST),
  PropertyControllers.deleteProperty
);

// Toggle guest favorite - GUEST/HOST/ADMIN
router.patch(
  "/:id/toggle-favorite",
  checkAuth(Role.GUEST, Role.HOST, Role.ADMIN),
  PropertyControllers.toggleGuestFavorite
);

export const PropertyRoutes = router;
