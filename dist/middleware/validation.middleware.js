"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const apiError_1 = require("../utils/apiError");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const errorMessage = error.errors.map(err => err.message).join(', ');
            return next(new apiError_1.ApiError(400, errorMessage));
        }
        next(error);
    }
};
exports.validate = validate;
