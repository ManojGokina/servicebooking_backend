"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
// models/Category.ts
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    image: String,
    name: String,
    banner: String
}, { timestamps: true });
exports.Category = mongoose_1.default.model('Category', categorySchema);
