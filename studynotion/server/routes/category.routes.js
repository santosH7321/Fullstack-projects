import express from 'express';
import { createCategory } from '../controller/category.controller.js';

const CategoryRouter = express.Router();

CategoryRouter.post("/", createCategory);

export default CategoryRouter;