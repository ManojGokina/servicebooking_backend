import { Request, Response, NextFunction } from 'express';
import { AddedToCart } from '../models/cart.model';

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, userName, items } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Cart items are required.' });
        }

        const operations = items.map(async (item: any) => {
            const existing = await AddedToCart.findOne({
                userId,
                subServiceId: item.subServiceId
            });

            if (existing) {
                // Update existing entry
                existing.quantity += item.quantity;
                existing.amount += item.amount;
                return await existing.save();
            } else {
                // Create new entry
                return await AddedToCart.create({
                    userId,
                    userName,
                    subServiceId: item.subServiceId,
                    subServiceName: item.subServiceName,
                    quantity: item.quantity,
                    amount: item.amount
                });
            }
        });

        const results = await Promise.all(operations);

        res.status(200).json({ message: 'Cart updated successfully', data: results });
    } catch (error) {
        next(error);
    }
};

const getUserCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const cart = await AddedToCart.find({ userId });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        await AddedToCart.deleteMany({ userId });
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        next(error);
    }
};


export default {
    addToCart,
    getUserCart,
    clearCart
};
