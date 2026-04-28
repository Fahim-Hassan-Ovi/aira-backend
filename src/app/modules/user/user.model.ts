import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, ICoord, IUser, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, {
    versionKey: false,
    _id: false
})

const coordSchema = new Schema<ICoord>({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
}, {
    versionKey: false,
    _id: false
})

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.GUEST,
    },
    picture: { type: String },
    fcmToken: { type: String },
    coord: coordSchema,
    isDeleted: { type: Boolean, default: false },
    isActive: {
        type: String,
        enum: Object.values(IsActive),
        default: IsActive.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    totalStays: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    language: { type: String },
    currency: { type: String },
    bio: { type: String },
    birthday: { type: Date },
    education: { type: String },
    profession: { type: String },
    languages: [{ type: String }],
    hostingStyle: [{ type: String }],
    payoutMethod: { type: Schema.Types.ObjectId, ref: "PayoutMethod" },
    otp: { type: String },
    auths: [authProviderSchema],
}, {
    timestamps: true,
    versionKey: false
})

userSchema.index({ coord: "2dsphere" });

export const User = model<IUser>("User", userSchema);