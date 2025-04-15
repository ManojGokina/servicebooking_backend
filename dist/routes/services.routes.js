"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = require("express");
const services_controller_1 = __importDefault(require("../controllers/services.controller"));
const validation_middleware_1 = require("../middleware/validation.middleware");
const service_validation_1 = require("../validations/service.validation");
const { postServiceCategories, getAllServiceCategories } = services_controller_1.default;
const router = (0, express_1.Router)();
router.post('/service-categories', (0, validation_middleware_1.validate)(service_validation_1.categoryValidation.categorySchema), postServiceCategories);
router.get('/get-service-categories', getAllServiceCategories);
exports.serviceRoutes = router;
