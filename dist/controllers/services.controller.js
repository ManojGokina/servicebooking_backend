"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = require("../models/category.model");
const subcategory_model_1 = require("../models/subcategory.model");
const service_model_1 = require("../models/service.model");
const subservice_model_1 = require("../models/subservice.model");
const postServiceCategories = async (req, res, next) => {
    try {
        const { name, image, banner, subCategories } = req.body;
        // 1. Create Category
        const newCategory = new category_model_1.Category({ name, image, banner });
        const savedCategory = await newCategory.save();
        // Arrays to hold docs for bulk insert
        const subCategoryDocs = [];
        const serviceDocs = [];
        const subServiceDocs = [];
        const subCategoryMap = new Map();
        const serviceMap = new Map();
        // Generate data for subcategories, services, and subservices
        subCategories.forEach((sub, subIndex) => {
            const tempSubCatId = `sub_${subIndex}`;
            subCategoryDocs.push({
                name: sub.name,
                image: sub.image,
                categoryId: savedCategory._id,
                _tempId: tempSubCatId
            });
            (sub.services || []).forEach((service, servIndex) => {
                const tempServiceId = `srv_${subIndex}_${servIndex}`;
                serviceDocs.push({
                    name: service.name,
                    image: service.image,
                    _tempId: tempServiceId,
                    _parentTempId: tempSubCatId
                });
                (service.subServices || []).forEach((subService) => {
                    subServiceDocs.push({
                        name: subService.name,
                        image: subService.image,
                        _parentTempId: tempServiceId
                    });
                });
            });
        });
        // 2. Insert subcategories
        const insertedSubCategories = await subcategory_model_1.SubCategory.insertMany(subCategoryDocs.map(({ _tempId, ...doc }) => doc));
        insertedSubCategories.forEach((doc, i) => {
            const tempId = subCategoryDocs[i]._tempId;
            subCategoryMap.set(tempId, doc._id);
        });
        // 3. Replace temp subCategory IDs in services
        const finalServiceDocs = serviceDocs.map(service => ({
            name: service.name,
            image: service.image,
            subCategoryId: subCategoryMap.get(service._parentTempId)
        }));
        const insertedServices = await service_model_1.Service.insertMany(finalServiceDocs);
        insertedServices.forEach((doc, i) => {
            const tempId = serviceDocs[i]._tempId;
            serviceMap.set(tempId, doc._id);
        });
        // 4. Replace temp service IDs in subServices
        const finalSubServiceDocs = subServiceDocs.map(subService => ({
            name: subService.name,
            image: subService.image,
            serviceId: serviceMap.get(subService._parentTempId)
        }));
        await subservice_model_1.SubService.insertMany(finalSubServiceDocs);
        res.status(201).json({
            message: 'Category, subcategories, services, and subservices saved successfully',
            data: savedCategory
        });
    }
    catch (error) {
        next(error);
    }
};
const getAllServiceCategories = async (req, res, next) => {
    try {
        console.log("api called");
        const categories = await category_model_1.Category.aggregate([
            {
                $lookup: {
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "subCategories"
                }
            },
            {
                $unwind: {
                    path: "$subCategories",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "services",
                    localField: "subCategories._id",
                    foreignField: "subCategoryId",
                    as: "subCategories.services"
                }
            },
            {
                $unwind: {
                    path: "$subCategories.services",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "subservices",
                    localField: "subCategories.services._id",
                    foreignField: "serviceId",
                    as: "subCategories.services.subServices"
                }
            },
            {
                $group: {
                    _id: {
                        categoryId: "$_id",
                        subCategoryId: "$subCategories._id",
                        serviceId: "$subCategories.services._id"
                    },
                    categoryName: { $first: "$name" },
                    categoryImage: { $first: "$image" },
                    categoryBanner: { $first: "$banner" },
                    subCategory: { $first: "$subCategories" },
                    service: { $first: "$subCategories.services" }
                }
            },
            {
                $group: {
                    _id: {
                        categoryId: "$_id.categoryId",
                        subCategoryId: "$_id.subCategoryId"
                    },
                    categoryName: { $first: "$categoryName" },
                    categoryImage: { $first: "$categoryImage" },
                    categoryBanner: { $first: "$categoryBanner" },
                    subCategory: { $first: "$subCategory" },
                    services: { $push: "$service" }
                }
            },
            {
                $group: {
                    _id: "$_id.categoryId",
                    name: { $first: "$categoryName" },
                    image: { $first: "$categoryImage" },
                    banner: { $first: "$categoryBanner" },
                    subCategories: {
                        $push: {
                            _id: "$subCategory._id",
                            name: "$subCategory.name",
                            image: "$subCategory.image",
                            services: "$services"
                        }
                    }
                }
            }
        ]);
        res.status(200).json({
            message: 'Categories fetched successfully',
            data: categories
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories' });
        next(error);
    }
};
exports.default = {
    postServiceCategories,
    getAllServiceCategories
};
