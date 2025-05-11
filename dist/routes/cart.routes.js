"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const { addToCart, getUserCart, clearCart } = cart_controller_1.default;
const router = (0, express_1.Router)();
router.post('/cart', addToCart);
router.get('/cart/:userId', getUserCart);
router.delete('/cart/:userId', clearCart);
exports.cartRoutes = router;
