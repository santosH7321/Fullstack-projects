import express from 'express';
import { createCategory, fetchCategory } from '../controller/category.controller.js';

const CategoryRouter = express.Router();

CategoryRouter.post("/", createCategory);
CategoryRouter.get("/", fetchCategory);

export default CategoryRouter;