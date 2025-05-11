import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRoutes } from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';
import { logger } from './utils/logger';
import { serviceRoutes } from './routes/services.routes';
import { cartRoutes } from './routes/cart.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Allow all origins (for development only)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`); 
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/cartservice', cartRoutes);

// Error handling
app.use(errorHandler);  

export default app;