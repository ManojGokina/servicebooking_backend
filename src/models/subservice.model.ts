import mongoose, { Schema, Document } from 'mongoose';

export interface ISubService extends Document {
    name: string;
    image?: string;
    serviceId: mongoose.Types.ObjectId;
}

const SubServiceSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String },
        serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }
    },
    { timestamps: true }
);

export const SubService = mongoose.model<ISubService>('SubService', SubServiceSchema);
