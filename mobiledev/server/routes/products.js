import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts
} from('../controllers/productController');
import { protect, authorize } from ('../middleware/auth');

router
  .route('/')
  .get(getProducts)
  .post(protect, authorize('admin'), createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorize('admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts);

export default router;