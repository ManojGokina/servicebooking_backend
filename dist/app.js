"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_routes_1 = require("./routes/auth.routes");
const error_middleware_1 = require("./middleware/error.middleware");
const logger_1 = require("./utils/logger");
const services_routes_1 = require("./routes/services.routes");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// Request logging
app.use((req, res, next) => {
    logger_1.logger.info(`${req.method} ${req.url}`);
    next();
});
// Routes
app.use('/api/auth', auth_routes_1.authRoutes);
app.use('/api/services', services_routes_1.serviceRoutes);
// Error handling
app.use(error_middleware_1.errorHandler);
exports.default = app;
