// controllers/services.controller.ts
import { Request, Response, NextFunction } from 'express';
import { Category } from '../models/category.model';
import { SubCategory } from '../models/subcategory.model';

export const postServiceCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, image, banner, subCategories } = req.body;

        // Save the category
        const newCategory = new Category({ name, image, banner });
        const savedCategory = await newCategory.save();

        // Prepare subcategory documents with categoryId reference
        const subCategoryDocs = subCategories.map((sub: any) => ({
            name: sub.name,
            image: sub.image,
            categoryId: savedCategory._id
        }));

        await SubCategory.insertMany(subCategoryDocs);

        res.status(201).json({
            message: 'Category and subcategories saved successfully',
            data: savedCategory
        });
    } catch (error) {
        next(error);
    }
};


const getAllServiceCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Perform an aggregation to join Categories and SubCategories based on categoryId
        const result = await Category.aggregate([
            {
                $lookup: {
                    from: "subcategories", // the name of your subcategory collection
                    localField: "_id", // the field from the Category collection
                    foreignField: "categoryId", // the field in SubCategory collection that references Category
                    as: "subCategories" // name of the field that will contain the subcategories in the result
                }
            },
            {
                $project: {
                    image: 1,
                    name: 1,
                    banner: 1,
                    subCategories: {
                        $map: {
                            input: "$subCategories",
                            as: "sub",
                            in: {
                                id: "$$sub._id", // ID of the subcategory
                                name: "$$sub.name",
                                image: "$$sub.image"
                            }
                        }
                    }
                }
            }
        ]);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



export default {
    postServiceCategories,
    getAllServiceCategories
};