"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
// models/SubCategory.ts
const mongoose_1 = __importDefault(require("mongoose"));
const subCategorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true });
exports.SubCategory = mongoose_1.default.model('SubCategory', subCategorySchema);
