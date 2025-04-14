import { Router } from 'express';
import servicesController from '../controllers/services.controller';
import { validate } from '../middleware/validation.middleware';
import { categoryValidation } from '../validations/service.validation';
const { postServiceCategories, getAllServiceCategories } = servicesController;
const router = Router();

router.post('/service-categories', validate(categoryValidation.categorySchema), postServiceCategories);
router.get('/get-service-categories', getAllServiceCategories);

export const serviceRoutes = router;