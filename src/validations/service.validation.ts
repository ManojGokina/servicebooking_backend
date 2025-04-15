// validations/categories.validation.ts
import { z } from 'zod';

const subServiceSchema = z.object({
    name: z.string(),
    image: z.string()
});

const serviceSchema = z.object({
    name: z.string(),
    image: z.string(),
    subServices: z.array(subServiceSchema)
});

const subCategorySchema = z.object({
    name: z.string(),
    image: z.string(),
    services: z.array(serviceSchema)
});

const categorySchema = z.object({
    name: z.string(),
    image: z.string(),
    banner: z.string(),
    subCategories: z.array(subCategorySchema)
});

export const categoryValidation = {
    categorySchema
};
