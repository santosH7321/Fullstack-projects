import express from 'express';
const router = express.Router();
import {
  createOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
  processPayment,
  sendStripeApi
} from ('../controllers/orderController.js');
import { protect, authorize } from ('../middleware/auth.js');

router.route('/').post(protect, createOrder).get(protect, authorize('admin'), allOrders);
router.route('/me').get(protect, myOrders);
router.route('/:id').get(protect, getSingleOrder);
router.route('/:id').put(protect, authorize('admin'), updateOrder);
router.route('/:id').delete(protect, authorize('admin'), deleteOrder);

router.route('/payment/process').post(protect, processPayment);
router.route('/stripeapi').get(protect, sendStripeApi);

export default router;