"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_model_1 = require("../models/user.model");
const apiError_1 = require("../utils/apiError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthController {
    static async register(req, res, next) {
        try {
            const { email, phoneno } = req.body;
            const user = await user_model_1.UserModel.create({ email, phoneno });
            res.status(201).json({ user });
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await user_model_1.UserModel.findOne({ email });
            if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
                throw new apiError_1.ApiError(401, 'Invalid credentials');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
            res.json({ token });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
