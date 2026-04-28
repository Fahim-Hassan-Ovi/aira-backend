import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is required" })
        .min(2, { message: "Name is too short. Minimum 2 character long" })
        .max(50, { message: "Name is too long" }),
    phone: z.string()
        .regex(/^(\+8801|01)[3-9]\d{8}$/, {
            message:
                "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),
    password: z.string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one digit" })
        .regex(/[^A-Za-z0-9]/, {
            message: "Password must contain at least one special character",
        })
        .optional(),
    email: z.string()
        .email({ message: "Invalid email address" })
        .min(5, { message: "Email must be at least 5 characters long" })
        .max(100, { message: "Email cannot exceed 100 characters" }),
    picture: z.string().optional(),
    role: z
        .enum(Object.values(Role) as [string])
        .optional(),
    isActive: z
        .enum(Object.values(IsActive) as [string])
        .optional(),
    isDeleted: z
        .boolean()
        .optional(),
    isVerified: z
        .boolean()
        .optional(),
    fcmToken: z.string().optional(),
    coord: z
        .object({
            lat: z.number(),
            lon: z.number(),
        })
        .optional(),
    totalStays: z.number().optional(),
    averageRating: z.number().optional(),
    language: z.string().optional(),
    currency: z.string().optional(),
    bio: z.string().optional(),
    birthday: z.date().optional(),
    education: z.string().optional(),
    profession: z.string().optional(),
    languages: z.array(z.string()).optional(),
    hostingStyle: z.array(z.string()).optional(),
    payoutMethod: z.string().optional(),
    otp: z.string().optional(),
    auths: z.array(z.object({
        provider: z.enum(["google", "credentials", "apple"]),
        providerId: z.string()
    })).optional()
})

export const updateUserZodSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is required" })
        .min(2, { message: "Name is too short. Minimum 2 character long" })
        .max(50, { message: "Name is too long" })
        .optional(),
    password: z.string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one digit" })
        .regex(/[^A-Za-z0-9]/, {
            message: "Password must contain at least one special character",
        })
        .optional(),
    email: z.string()
        .email({ message: "Invalid email address" })
        .optional(),
    picture: z.string().optional(),
    fcmToken: z.string().optional(),
    otp: z.string().optional(),
    coord: z
        .object({
            lat: z.number(),
            lon: z.number(),
        })
        .optional(),
    isActive: z
        .enum(Object.values(IsActive) as [string])
        .optional(),
    isDeleted: z.boolean().optional(),
    isVerified: z.boolean().optional(),
    totalStays: z.number().optional(),
    averageRating: z.number().optional(),
    language: z.string().optional(),
    currency: z.string().optional(),
    bio: z.string().optional(),
    birthday: z.date().optional(),
    education: z.string().optional(),
    profession: z.string().optional(),
    languages: z.array(z.string()).optional(),
    hostingStyle: z.array(z.string()).optional(),
    payoutMethod: z.string().optional(),
    auths: z.array(z.object({
        provider: z.enum(["google", "credentials", "apple"]),
        providerId: z.string()
    })).optional()
})

export const verifyOtpZodSchema = z.object({
    otp: z
        .string("OTP type should be string!")
        .optional(),
    email: z.string()
        .email({ message: "Invalid email address" })
        .min(5, { message: "Email must be at least 5 characters long" })
        .max(100, { message: "Email cannot exceed 100 characters" }),

})