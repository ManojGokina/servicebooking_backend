import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem extends Document {
    userId: string;
    userName: string;
    subServiceId: string;
    subServiceName: string;
    quantity: number;
    amount: number;
}

const cartSchema = new Schema<ICartItem>(
    {
        userId: { type: String, required: true,},
        userName: { type: String, required: true },
        subServiceId: { type: String, required: true,},
        subServiceName: { type: String, required: true },
        quantity: { type: Number, required: true },
        amount: { type: Number, required: true }
    },
    { timestamps: true }
);

export const AddedToCart = mongoose.model<ICartItem>('AddedToCart', cartSchema);
