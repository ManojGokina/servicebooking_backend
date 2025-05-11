"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = require("../models/cart.model");
const addToCart = async (req, res, next) => {
    try {
        const { userId, userName, items } = req.body;
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Cart items are required.' });
        }
        const operations = items.map(async (item) => {
            const existing = await cart_model_1.AddedToCart.findOne({
                userId,
                subServiceId: item.subServiceId
            });
            if (existing) {
                // Update existing entry
                existing.quantity += item.quantity;
                existing.amount += item.amount;
                return await existing.save();
            }
            else {
                // Create new entry
                return await cart_model_1.AddedToCart.create({
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
    }
    catch (error) {
        next(error);
    }
};
const getUserCart = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cart = await cart_model_1.AddedToCart.find({ userId });
        res.status(200).json(cart);
    }
    catch (error) {
        next(error);
    }
};
const clearCart = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await cart_model_1.AddedToCart.deleteMany({ userId });
        res.status(200).json({ message: 'Cart cleared' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    addToCart,
    getUserCart,
    clearCart
};
