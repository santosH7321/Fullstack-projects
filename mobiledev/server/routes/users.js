import express from 'express';
const router = express.Router();
import { protect, authorize } from '../middleware/auth.js';
import User from'../models/User.js';


router.get('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
});

export default router;