"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
// validations/categories.validation.ts
const zod_1 = require("zod");
const subServiceSchema = zod_1.z.object({
    name: zod_1.z.string(),
    image: zod_1.z.string()
});
const serviceSchema = zod_1.z.object({
    name: zod_1.z.string(),
    image: zod_1.z.string(),
    subServices: zod_1.z.array(subServiceSchema)
});
const subCategorySchema = zod_1.z.object({
    name: zod_1.z.string(),
    image: zod_1.z.string(),
    services: zod_1.z.array(serviceSchema)
});
const categorySchema = zod_1.z.object({
    name: zod_1.z.string(),
    image: zod_1.z.string(),
    banner: zod_1.z.string(),
    subCategories: zod_1.z.array(subCategorySchema)
});
exports.categoryValidation = {
    categorySchema
};
