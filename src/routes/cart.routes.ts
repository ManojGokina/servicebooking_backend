import { Router } from 'express';
import cartController from '../controllers/cart.controller';

const { addToCart, getUserCart, clearCart } = cartController;
const router = Router();

router.post('/cart', addToCart);
router.get('/cart/:userId', getUserCart);
router.delete('/cart/:userId', clearCart);

export const cartRoutes = router;
