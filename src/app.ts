import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRoutes } from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';
import { logger } from './utils/logger';
import { serviceRoutes } from './routes/services.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

// Error handling
app.use(errorHandler);  

export default app;