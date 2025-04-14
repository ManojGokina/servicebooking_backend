// validations/categories.validation.ts
import { z } from 'zod';

const subCategorySchema = z.object({
    name: z.string(),
    image: z.string().url()
});

const categorySchema = z.object({
    image: z.string().url(),
    name: z.string(),
    banner: z.string(),
    subCategories: z.array(subCategorySchema)
});

export const categoryValidation = {
    categorySchema
};
