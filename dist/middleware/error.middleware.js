"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const apiError_1 = require("../utils/apiError");
const logger_1 = require("../utils/logger");
const errorHandler = (err, req, res, next) => {
    if (err instanceof apiError_1.ApiError) {
        logger_1.logger.error(`API Error: ${err.message}`, {
            statusCode: err.statusCode,
            stack: err.stack
        });
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    // Handle unexpected errors
    logger_1.logger.error('Unexpected Error:', err);
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
};
exports.errorHandler = errorHandler;
