/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema, verifyOtpZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";


const router = Router();

router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);

router.patch("/update-location", checkAuth(Role.GUEST, Role.HOST, Role.ADMIN), UserControllers.updateUserLocation);

router.post('/verify', validateRequest(verifyOtpZodSchema), UserControllers.verifyUser);
router.post('/resend-otp', UserControllers.resendOTP);

router.get("/all-users", checkAuth(Role.HOST, Role.ADMIN) , UserControllers.getAllUsers);

router.get("/me", checkAuth(...Object.values(Role)) , UserControllers.getMe);

router.get("/:id", checkAuth(Role.HOST, Role.ADMIN), UserControllers.getSingleUser)

router.patch("/:id", validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateUser)

export const UserRoutes = router;
