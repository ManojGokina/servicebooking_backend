import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
    name: string;
    image?: string;
    subCategoryId: mongoose.Types.ObjectId;
}

const ServiceSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String },
        subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true }
    },
    { timestamps: true }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);
